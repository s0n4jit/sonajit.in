'use server';

import matter from 'gray-matter';
import { marked } from 'marked';
import { 
  BLOG_REPO_OWNER, 
  BLOG_REPO_NAME, 
  BLOG_POSTS_PATH, 
  BLOG_EXTERNAL_URL 
} from '@/constants';
import { BlogPost } from '@/types';

/**
 * Server Action to fetch blog posts from GitHub securely using a server-side token.
 */
export async function getBlogPosts(isFullArchive: boolean): Promise<{ posts: BlogPost[], error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error("GITHUB_TOKEN is missing in server environment.");
    return { posts: [], error: "Internal Server Configuration Error" };
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${BLOG_REPO_OWNER}/${BLOG_REPO_NAME}/contents/${BLOG_POSTS_PATH}?ref=main`,
      { 
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const files = await response.json();
    if (!Array.isArray(files)) return { posts: [] };

    const mdFiles = files.filter(file => file.name.endsWith('.md')).reverse();
    const postsToFetch = isFullArchive ? mdFiles : mdFiles.slice(0, 2);

    const postPromises = postsToFetch.map(async (file) => {
      const contentRes = await fetch(file.url, {
        headers: { 
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3.raw'
        }
      });
      
      if (!contentRes.ok) return null;

      const contentText = await contentRes.text();
      const { data } = matter(contentText);

      const slugMatch = file.name.match(/^\d{4}-\d{2}-\d{2}-(.*)\.md$/);
      const slug = slugMatch ? slugMatch[1] : file.name.replace(/\.md$/, '');
      const externalUrl = `${BLOG_EXTERNAL_URL}/posts/${slug}/`;

      let imageUrl: string | undefined;
      if (data.image) {
        const imagePath = typeof data.image === 'string' ? data.image : data.image.path;
        if (imagePath) {
          imageUrl = imagePath.startsWith('http') ? imagePath : `${BLOG_EXTERNAL_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
        }
      }

      return {
        title: data.title || slug.replace(/-/g, ' ').toUpperCase(),
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : file.name.substring(0, 10),
        summary: data.description || data.excerpt || "Technical research and documentation regarding infrastructure security.",
        url: externalUrl,
        tags: data.tags || data.categories || [],
        image: imageUrl,
      } as BlogPost;
    });

    const fetchedPosts = (await Promise.all(postPromises)).filter(p => p !== null) as BlogPost[];
    return { posts: fetchedPosts };
  } catch (error: any) {
    console.error('Error in getBlogPosts:', error);
    return { posts: [], error: error.message };
  }
}

/**
 * Server Action to fetch project READMEs and render them to HTML securely.
 */
export async function getProjectReadme(githubLink: string): Promise<{ html: string, error?: string }> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return { html: '', error: "Server Configuration Error" };
  }

  const urlMatch = githubLink.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!urlMatch) {
    return { html: '', error: "Invalid GitHub URL format" };
  }

  const owner = urlMatch[1];
  const repo = urlMatch[2].replace(/\.git$/, '');

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3.raw',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Documentation not found: ${response.statusText}`);
    }

    const rawMarkdown = await response.text();
    const html = await marked.parse(rawMarkdown);
    
    return { html: html as string };
  } catch (error: any) {
    console.error('Error in getProjectReadme:', error);
    return { html: '', error: error.message };
  }
}
