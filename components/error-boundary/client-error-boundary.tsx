'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ClientErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ClientErrorBoundary key={pathname}>
      {children}
    </ClientErrorBoundary>
  );
}
