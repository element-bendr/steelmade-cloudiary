import React from 'react'

export const GradientChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative top-[1px] ml-1 transition duration-200 group-data-[state=open]:rotate-180"
  >
    <defs>
      <linearGradient id="chevron-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <path
      d="M6 9l6 6 6-6"
      stroke="url(#chevron-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
