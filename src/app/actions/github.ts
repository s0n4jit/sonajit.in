'use server';

import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost, ProjectData } from '@/types';

const getBlogConfig = () => {
  const owner = process.env.BLOG_GITHUB_OWNER;
  const repo = process.env.BLOG_GITHUB_REPO;
  const postsPath = process.env.BLOG_GITHUB_POSTS_PATH || '';
  const externalUrl = process.env.BLOG_EXTERNAL_URL || process.env.NEXT_PUBLIC_BLOG_EXTERNAL_URL || 'https://blog.sonajit.in';

  return { owner, repo, postsPath, externalUrl };
};

const formatPostDate = (date: unknown, fallback: string) => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }

  if (typeof date === 'string') {
    return date;
  }

  return fallback;
};

const getProjectsConfig = () => {
  const owner = process.env.PROJECTS_GITHUB_OWNER;
  const repo = process.env.PROJECTS_GITHUB_REPO;
  const jsonPath = process.env.PROJECTS_JSON_PATH || 'projects.json';
  const ref = process.env.PROJECTS_GITHUB_REF || 'main';

  return { owner, repo, jsonPath, ref };
};

const toStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(/[\s,]+/).map(item => item.trim()).filter(Boolean);
  }

  return [];
};

const rawGithubAssetPath = (url: URL, owner: string, repo: string, ref: string) => {
  if (url.hostname !== 'raw.githubusercontent.com') {
    return null;
  }

  const pathParts = url.pathname.split('/').filter(Boolean);
  const repoIndex = pathParts.findIndex((part, index) => part === repo && pathParts[index - 1] === owner);

  if (repoIndex === -1) {
    return null;
  }

  const afterRepo = pathParts.slice(repoIndex + 1);

  if (afterRepo[0] === 'refs' && afterRepo[1] === 'heads') {
    return afterRepo.slice(3).join('/');
  }

  if (afterRepo[0] === ref) {
    return afterRepo.slice(1).join('/');
  }

  return null;
};

const resolveProjectImage = (image: unknown, owner: string, repo: string, ref: string, jsonDir: string) => {
  if (typeof image !== 'string' || !image) {
    return '/img/placeholder.png';
  }

  if (image.startsWith('/img/')) {
    return image;
  }

  if (image.startsWith('http')) {
    try {
      const url = new URL(image);
      const assetPath = rawGithubAssetPath(url, owner, repo, ref);

      if (assetPath) {
        return `/api/projects/asset?path=${encodeURIComponent(assetPath)}`;
      }
    } catch {
      return image;
    }

    return image;
  }

  const imagePath = image.replace(/^\/+/, '');
  const assetPath = image.startsWith('/') || !jsonDir ? imagePath : `${jsonDir}/${imagePath}`;
  return `/api/projects/asset?path=${encodeURIComponent(assetPath)}`;
};

const normalizeProject = (project: any, index: number, owner: string, repo: string, ref: string, jsonDir: string): ProjectData | null => {
  const title = project.title || project.name;

  if (!title) {
    return null;
  }

  const githubLink = project.githubLink || project.github || project.repoUrl || project.repository || project.source || '#';
  const demoLink = project.demoLink || project.demo || project.live || project.liveUrl || project.url;
  const image = resolveProjectImage(project.image || project.cover || project.thumbnail || project.screenshot, owner, repo, ref, jsonDir);
  const tags = toStringArray(project.tags || project.technologies || project.techStack || project.stack);

  return {
    title: String(title),
    description: String(project.description || project.summary || project.excerpt || ''),
    tags,
    githubLink: String(githubLink),
    demoLink: demoLink ? String(demoLink) : undefined,
    image,
    date: formatPostDate(project.date || project.updatedAt || project.createdAt, `2024-01-${String(index + 1).padStart(2, '0')}`),
  };
};

const githubAssetProxyUrl = (owner: string, repo: string, path: string, ref?: string) => {
  const params = new URLSearchParams({ owner, repo, path });

  if (ref) {
    params.set('ref', ref);
  }

  return `/api/github/asset?${params.toString()}`;
};

const normalizeAssetPath = (path: string) => {
  const cleanPath = path.split(/[?#]/)[0];
  const stack: string[] = [];

  cleanPath.split('/').forEach(part => {
    if (!part || part === '.') {
      return;
    }

    if (part === '..') {
      stack.pop();
      return;
    }

    stack.push(part);
  });

  return stack.join('/');
};

const rawGithubReadmeAssetPath = (url: URL, owner: string, repo: string) => {
  if (url.hostname !== 'raw.githubusercontent.com') {
    return null;
  }

  const pathParts = url.pathname.split('/').filter(Boolean);

  if (pathParts[0] !== owner || pathParts[1] !== repo) {
    return null;
  }

  if (pathParts[2] === 'refs' && pathParts[3] === 'heads') {
    return {
      ref: pathParts[4],
      path: pathParts.slice(5).join('/'),
    };
  }

  return {
    ref: pathParts[2],
    path: pathParts.slice(3).join('/'),
  };
};

const resolveReadmeAsset = (src: string, owner: string, repo: string, readmePath: string) => {
  if (!src || src.startsWith('data:') || src.startsWith('#')) {
    return src;
  }

  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src);
      const asset = rawGithubReadmeAssetPath(url, owner, repo);

      if (asset?.path) {
        return githubAssetProxyUrl(owner, repo, asset.path, asset.ref);
      }
    } catch {
      return src;
    }

    return src;
  }

  const srcWithoutHash = src.split('#')[0];
  const srcSuffix = src.slice(srcWithoutHash.length);
  const readmeDir = readmePath.split('/').slice(0, -1).join('/');
  const assetPath = srcWithoutHash.startsWith('/')
    ? normalizeAssetPath(srcWithoutHash)
    : normalizeAssetPath(`${readmeDir}/${srcWithoutHash}`);

  return `${githubAssetProxyUrl(owner, repo, assetPath)}${srcSuffix}`;
};

const rewriteReadmeAssetUrls = (markdown: string, owner: string, repo: string, readmePath: string) => {
  const markdownImages = markdown.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_match, alt, src) => {
    return `![${alt}](${resolveReadmeAsset(src, owner, repo, readmePath)})`;
  });

  return markdownImages.replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (_match, start, src, end) => {
    return `${start}${resolveReadmeAsset(src, owner, repo, readmePath)}${end}`;
  });
};

/**
 * Server Action to fetch blog posts from GitHub securely using a server-side token.
 */
export async function getBlogPosts(isFullArchive: boolean): Promise<{ posts: BlogPost[], error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  const { owner, repo, postsPath, externalUrl } = getBlogConfig();
  
  if (!token) {
    console.error("GITHUB_TOKEN is missing in server environment.");
    return { posts: [], error: "Internal Server Configuration Error" };
  }

  if (!owner || !repo) {
    console.error("BLOG_GITHUB_OWNER or BLOG_GITHUB_REPO is missing in server environment.");
    return { posts: [], error: "Blog Repository Configuration Error" };
  }

  try {
    const normalizedPostsPath = postsPath.replace(/^\/|\/$/g, '');
    const contentsPath = normalizedPostsPath ? `/${normalizedPostsPath}` : '';
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents${contentsPath}?ref=main`,
      { 
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const files = await response.json();
    if (!Array.isArray(files)) return { posts: [] };

    const mdFiles = files.filter(file => file.name.endsWith('.md') && file.name !== 'README.md');

    const postPromises = mdFiles.map(async (file) => {
      const contentRes = await fetch(file.url, {
        headers: { 
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3.raw'
        },
        cache: 'no-store',
      });
      
      if (!contentRes.ok) return null;

      const contentText = await contentRes.text();
      const { data } = matter(contentText);

      if (!data.title) return null;

      const fileSlug = file.name.replace(/\.md$/, '');
      const slug = data.slug || fileSlug;
      const postUrl = `${externalUrl.replace(/\/$/, '')}/${slug}`;

      let imageUrl: string | undefined;
      const cover = data.cover || data.ogImage || data.image;
      if (cover) {
        const imagePath = typeof cover === 'string' ? cover : cover.path;
        if (imagePath) {
          imageUrl = imagePath.startsWith('http') ? imagePath : `${externalUrl.replace(/\/$/, '')}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
        }
      }

      const rawTags = data.tags || data.categories || [];
      const tags = Array.isArray(rawTags)
        ? rawTags.map(String)
        : String(rawTags).split(/[\s,]+/).filter(Boolean);

      return {
        title: data.title,
        date: formatPostDate(data.datePublished || data.date, file.name.substring(0, 10)),
        summary: data.seoDescription || data.description || data.excerpt || "Technical research and documentation regarding infrastructure security.",
        url: postUrl,
        tags,
        image: imageUrl,
      } as BlogPost;
    });

    const fetchedPosts: BlogPost[] = (await Promise.all(postPromises))
      .filter((post): post is BlogPost => post !== null);

    fetchedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const posts = isFullArchive ? fetchedPosts : fetchedPosts.slice(0, 2);

    return { posts };
  } catch (error: any) {
    console.error('Error in getBlogPosts:', error);
    return { posts: [], error: error.message };
  }
}

/**
 * Server Action to fetch project showcase data from a GitHub-hosted JSON file.
 */
export async function getProjects(): Promise<{ projects: ProjectData[], error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  const { owner, repo, jsonPath, ref } = getProjectsConfig();

  if (!owner || !repo) {
    console.error("PROJECTS_GITHUB_OWNER or PROJECTS_GITHUB_REPO is missing in server environment.");
    return { projects: [], error: "Projects Repository Configuration Error" };
  }

  try {
    const normalizedJsonPath = jsonPath.replace(/^\/|\/$/g, '');
    const jsonDir = normalizedJsonPath.split('/').slice(0, -1).join('/');
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${normalizedJsonPath}?ref=${ref}`,
      {
        headers: {
          ...(token ? { 'Authorization': `token ${token}` } : {}),
          'Accept': 'application/vnd.github.v3.raw',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const payload = await response.json();
    const rawProjects = Array.isArray(payload) ? payload : payload.projects;

    if (!Array.isArray(rawProjects)) {
      throw new Error("Projects JSON must be an array or contain a projects array");
    }

    const normalizedProjects: ProjectData[] = rawProjects
      .map((project, index) => normalizeProject(project, index, owner, repo, ref, jsonDir))
      .filter((project): project is ProjectData => project !== null);

    const projects = normalizedProjects
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    return { projects };
  } catch (error: any) {
    console.error('Error in getProjects:', error);
    return { projects: [], error: error.message };
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
        'Accept': 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Documentation not found: ${response.statusText}`);
    }

    const readme = await response.json();
    const rawMarkdown = Buffer.from(readme.content.replace(/\n/g, ''), 'base64').toString('utf8');
    const markdown = rewriteReadmeAssetUrls(rawMarkdown, owner, repo, readme.path || 'README.md');
    const html = await marked.parse(markdown);
    
    return { html: html as string };
  } catch (error: any) {
    console.error('Error in getProjectReadme:', error);
    return { html: '', error: error.message };
  }
}
