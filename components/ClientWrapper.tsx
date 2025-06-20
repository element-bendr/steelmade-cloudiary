'use client'

import { ReactNode } from 'react';
import { AppContextProvider } from '@/context/AppContext';
import { ProductContextProvider } from '@/context/ProductContext';

interface ClientWrapperProps {
  children: ReactNode;
}

/**
 * Client component wrapper to provide context to server components
 * This component should be used to wrap server components that need access to client-side contexts
 */
export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <AppContextProvider>
      <ProductContextProvider>
        {children}
      </ProductContextProvider>
    </AppContextProvider>
  );
}