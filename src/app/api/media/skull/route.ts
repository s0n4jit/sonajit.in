import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Streaming API for media assets with referer protection.
 */
export async function GET(request: NextRequest) {
  // 1. Referer Validation
  const referer = request.headers.get('referer');
  const host = request.headers.get('host')?.split(':')[0]; 
  const isDev = process.env.NODE_ENV === 'development';
  
  // Block access if not in dev and referer is missing or invalid
  if (!isDev && (!referer || !referer.includes(host || ''))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 2. Locate the file (case-insensitive search for flexibility)
  const possiblePaths = [
    path.join(process.cwd(), 'private-media', 'Skull.mp4'),
    path.join(process.cwd(), 'private-media', 'skull.mp4'),
    path.join(process.cwd(), 'public', 'img', 'heroimg', 'Skull.mp4'),
    path.join(process.cwd(), 'public', 'img', 'heroimg', 'skull.mp4'),
  ];
  
  let finalPath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      finalPath = p;
      break;
    }
  }

  if (!finalPath) {
    return new NextResponse('Media Not Found', { status: 404 });
  }

  // 3. Handle Range Requests (important for video seeking/loading)
  const stat = fs.statSync(finalPath);
  const fileSize = stat.size;
  const range = request.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
    if (start >= fileSize || end >= fileSize) {
      return new NextResponse('Requested range not satisfiable', { status: 416 });
    }

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(finalPath, { start, end });
    
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize.toString(),
      'Content-Type': 'video/mp4',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    };

    return new NextResponse(file as any, { status: 206, headers: head });
  } else {
    const head = {
      'Content-Length': fileSize.toString(),
      'Content-Type': 'video/mp4',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    };
    const file = fs.createReadStream(finalPath);
    return new NextResponse(file as any, { status: 200, headers: head });
  }
}
