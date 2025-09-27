export function cloudinaryUrl(publicPath: string, options?: { quality?: number; formatAuto?: boolean }) {
  const q = options?.quality ?? 75;
  const fauto = options?.formatAuto ?? true;
  // publicPath is the path after /upload/, e.g. "v1749458143/steelmade/chairs/.../ic-01-hb.jpg"
  // If caller passes a full URL, try to extract the upload path
  let path = publicPath;
  try {
    const u = new URL(publicPath);
    const idx = u.pathname.indexOf('/upload/');
    if (idx !== -1) path = u.pathname.slice(idx + '/upload/'.length);
  } catch (e) {
    // not a full URL, treat as path
  }

  const transforms = [] as string[];
  if (fauto) transforms.push('f_auto');
  if (q) transforms.push(`q_${q}`);

  return `https://res.cloudinary.com/dqde19mfs/image/upload/${transforms.join(',')}/${path}`;
}

export default cloudinaryUrl;
