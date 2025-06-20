'use client'

import { AppContextProvider } from '@/context/AppContext';
import { ProductContextProvider } from '@/context/ProductContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <ProductContextProvider>
            {children}
          </ProductContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}