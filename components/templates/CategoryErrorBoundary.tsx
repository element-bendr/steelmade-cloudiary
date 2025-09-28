"use client";

import { Component, ReactNode } from 'react';
import { Button } from '../ui/button';

/**
 * Error boundary specifically designed for CategoryPageTemplate components.
 * 
 * This boundary catches JavaScript errors anywhere in the category page template tree,
 * logs those errors, and displays a fallback UI instead of crashing the entire page.
 * 
 * Features:
 * - Graceful error handling for category pages
 * - User-friendly error display with retry functionality
 * - Maintains category context in error messages
 * - Preserves navigation functionality during errors
 */

interface Props {
  /** Child components to wrap with error boundary */
  children: ReactNode;
  /** Category identifier for contextual error messages */
  categoryId?: string;
  /** Optional custom fallback component */
  fallback?: ReactNode;
}

interface State {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The caught error object */
  error?: Error;
}

/**
 * CategoryErrorBoundary - Error boundary component for category page templates.
 * 
 * Provides robust error handling for category pages with contextual error messages
 * and recovery options. Prevents JavaScript errors from crashing the entire page.
 * 
 * @example
 * ```tsx
 * <CategoryErrorBoundary categoryId="chairs">
 *   <CategoryPageTemplate categoryId="chairs" items={items} />
 * </CategoryErrorBoundary>
 * ```
 */
export class CategoryErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method called when an error is caught.
   * Updates component state to trigger error UI rendering.
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error
    };
  }

  /**
   * Called when an error is caught.
   * Logs error details for debugging and monitoring.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging and monitoring
    console.error('CategoryPageTemplate Error:', {
      error: error.message,
      stack: error.stack,
      categoryId: this.props.categoryId,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // In production, you might want to send this to an error reporting service
    // Example: errorReportingService.captureException(error, { tags: { categoryId: this.props.categoryId } });
  }

  /**
   * Resets the error boundary state to retry rendering.
   */
  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  /**
   * Navigates user back to the main categories page.
   */
  handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      const categoryName = this.props.categoryId 
        ? this.props.categoryId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : 'Category';

      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-gray-50">
          <div className="max-w-md mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <svg 
                  className="h-8 w-8 text-red-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We encountered an error while loading the {categoryName} page. 
              This is likely a temporary issue.
            </p>

            {/* Error Details (development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
                <code className="text-xs text-red-700 break-all">
                  {this.state.error.message}
                </code>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={this.handleRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
              <Button 
                onClick={this.handleGoHome}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Go to Homepage
              </Button>
            </div>

            {/* Support Information */}
            <p className="mt-6 text-sm text-gray-500">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CategoryErrorBoundary;