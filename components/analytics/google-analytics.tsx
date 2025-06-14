'use client';

import Script from 'next/script';

export function GoogleAnalytics({ id = 'G-XXXXXXXXXX' }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics script loaded successfully');
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
