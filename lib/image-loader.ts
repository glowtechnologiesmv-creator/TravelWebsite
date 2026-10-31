'use client';
import type { ImageLoaderProps } from 'next/image';

// Use the photo provider's responsive CDN rather than re-encoding remote photos.
// Local approved assets continue to work without a third-party request.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith('/')) return src;
  const url = new URL(src);
  if (url.protocol !== 'https:' || url.hostname !== 'images.unsplash.com') {
    throw new Error('Unsupported reference photography host');
  }
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality || 85));
  return url.toString();
}
