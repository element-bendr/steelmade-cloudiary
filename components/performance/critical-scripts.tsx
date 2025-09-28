'use client';

import Script from 'next/script';

export function CriticalScripts() {
  return (
    <>
      {/* Preconnect to improve third-party resource loading */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Preload the font CSS endpoint (if self-hosted or via Google Fonts CSS) */}
      <link rel="preload" href="/fonts.css" as="style" id="__sm-fonts-css" />
      <Script id="fonts-css-apply" strategy="afterInteractive">
        {`(function(){
          var l = document.getElementById('__sm-fonts-css');
          if (l) { l.addEventListener('load', function(){ l.rel = 'stylesheet'; }); }
        })()`}
      </Script>

      {/* Initialize minimal critical tracking after interactive to avoid blocking */}
      <Script id="performance-optimization" strategy="afterInteractive">
        {`
          window.SteelMade = window.SteelMade || {};
          window.SteelMade.loadStart = Date.now();
          window.SteelMade.trackTiming = function(label) {
            if (window.SteelMade.loadStart) {
              // Avoid heavy logs in production; use this for debug only
              if (location.hostname === 'localhost') console.log('Timing: ' + label + ' - ' + (Date.now() - window.SteelMade.loadStart) + 'ms');
            }
          };
        `}
      </Script>

      {/* Defer non-critical third-party scripts (analytics, chat, etc.) to afterInteractive or idle */}
      {/* Example: load analytics after idle to avoid render-blocking */}
      <Script id="load-analytics" strategy="lazyOnload">
        {`
          (function(){
            var s = document.createElement('script');
            s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (window.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX');
            s.async = true;
            s.onload = function(){
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', window.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX');
            };
            document.head.appendChild(s);
          })();
        `}
      </Script>
    </>
  );
}
