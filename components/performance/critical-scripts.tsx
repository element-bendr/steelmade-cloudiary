'use client';

import Script from 'next/script';

export function CriticalScripts() {
  return (
    <>
      {/* Preconnect to improve third-party resource loading */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Initialize performance tracking */}
      <Script id="performance-optimization" strategy="afterInteractive">
        {`
          // Add critical initialization code
          window.SteelMade = window.SteelMade || {};
          window.SteelMade.loadStart = Date.now();
          window.SteelMade.trackTiming = function(label) {
            if (window.SteelMade.loadStart) {
              console.log('Timing: ' + label + ' - ' + (Date.now() - window.SteelMade.loadStart) + 'ms');
            }
          };
        `}
      </Script>
    </>
  );
}
