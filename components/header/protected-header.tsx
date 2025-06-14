"use client";

import { ErrorBoundaryWrapper } from '@/components/error-boundary/client-error-boundary';
import Header from '../header';

export function ProtectedHeader() {
  return (
    <ErrorBoundaryWrapper>
      <Header />
    </ErrorBoundaryWrapper>
  );
}
