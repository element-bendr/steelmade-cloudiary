import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
