'use client'

import InstallHookSafety from './InstallHookSafety';

export default function ChairsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InstallHookSafety />
      <div className="chairs-container">
        {children}
      </div>
    </>
  );
}