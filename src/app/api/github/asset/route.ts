import { NextRequest, NextResponse } from 'next/server';

const contentTypes: Record<string, string> = {
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
};

const allowedOwners = () => {
  const owners = [
    process.env.PROJECTS_GITHUB_OWNER,
    process.env.BLOG_GITHUB_OWNER,
    process.env.GITHUB_ASSET_ALLOWED_OWNERS,
  ]
    .filter(Boolean)
    .flatMap(owner => String(owner).split(','))
    .map(owner => owner.trim().toLowerCase())
    .filter(Boolean);

  return new Set(owners);
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
  const owner = request.nextUrl.searchParams.get('owner') || '';
  const repo = request.nextUrl.searchParams.get('repo') || '';
  const ref = request.nextUrl.searchParams.get('ref') || undefined;
  const assetPath = request.nextUrl.searchParams.get('path')?.replace(/^\/+/, '') || '';

  if (!token) {
    return new NextResponse('GitHub token missing', { status: 500 });
  }

  if (!owner || !repo || !assetPath || assetPath.includes('..') || assetPath.includes('\\')) {
    return new NextResponse('Invalid GitHub asset request', { status: 400 });
  }

  if (!allowedOwners().has(owner.toLowerCase())) {
    return new NextResponse('GitHub asset owner not allowed', { status: 403 });
  }

  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/contents/${assetPath}`);

  if (ref) {
    url.searchParams.set('ref', ref);
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3.raw',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return new NextResponse('GitHub asset not found', { status: response.status });
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
