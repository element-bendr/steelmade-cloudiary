export const metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="sanity-studio-container" style={{ margin: 0, padding: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>{children}</div>
}
