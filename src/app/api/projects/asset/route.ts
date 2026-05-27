import { NextRequest, NextResponse } from 'next/server';

const getProjectsConfig = () => {
  const owner = process.env.PROJECTS_GITHUB_OWNER;
  const repo = process.env.PROJECTS_GITHUB_REPO;
  const ref = process.env.PROJECTS_GITHUB_REF || 'main';

  return { owner, repo, ref };
};

const contentTypes: Record<string, string> = {
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
};

const getContentType = (path: string, fallback: string | null) => {
  if (fallback && fallback !== 'application/json') {
    return fallback;
  }

  const ext = path.split('.').pop()?.toLowerCase() || '';
  return contentTypes[ext] || 'application/octet-stream';
};

export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  const { owner, repo, ref } = getProjectsConfig();
  const assetPath = request.nextUrl.searchParams.get('path')?.replace(/^\/+/, '') || '';

  if (!token || !owner || !repo) {
    return new NextResponse('Project asset configuration missing', { status: 500 });
  }

  if (!assetPath || assetPath.includes('..') || assetPath.includes('\\')) {
    return new NextResponse('Invalid project asset path', { status: 400 });
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${assetPath}?ref=${ref}`,
    {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3.raw',
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    return new NextResponse('Project asset not found', { status: response.status });
  }

  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': getContentType(assetPath, response.headers.get('content-type')),
      'Cache-Control': 'no-store',
    },
  });
}
