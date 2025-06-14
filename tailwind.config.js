/** @type {import('tailwindcss').Config} */
const animate = require('tailwindcss-animate');

module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        text: {
          DEFAULT: '#111827',
          muted: '#6B7280'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          light: '#DC2626',
          dark: '#991B1B',
          foreground: 'hsl(var(--accent-foreground))'
        },
        border: 'hsl(var(--border))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      boxShadow: {
        morphism: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'morphism-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.12)',
        'morphism-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.15)'
      },
      backdropBlur: {
        morphism: '2px'
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(to right, #FFFFFF, hsl(var(--accent)))',
        'gradient-morphism': 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))',
        'gradient-morphism-dark': 'linear-gradient(145deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.6))',
        'gradient-accent': 'linear-gradient(145deg, rgba(185, 28, 28, 0.9), rgba(185, 28, 28, 0.6))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.morphism': {
          'background': 'rgba(255, 255, 255, 0.7)',
          'backdrop-filter': 'blur(2px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        },
        '.morphism-dark': {
          'background': 'rgba(17, 24, 39, 0.7)',
          'backdrop-filter': 'blur(2px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        },
        '.morphism-card': {
          'background': 'rgba(255, 255, 255, 0.7)',
          'backdrop-filter': 'blur(2px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
          'transition': 'all 0.3s ease-in-out',
        },
        '.morphism-button': {
          'background': 'rgba(185, 28, 28, 0.9)',
          'backdrop-filter': 'blur(5px)',
          'border': '1px solid rgba(185, 28, 28, 0.2)',
          'transition': 'all 0.3s ease-in-out',
        },
        '.dark-mode-text': {
          '@apply dark:bg-text-gradient dark:bg-clip-text dark:text-transparent': {},
        },
        '.brand-text': {
          '@apply dark:text-accent dark:bg-none dark:bg-clip-border': {},
        }
      }
      addUtilities(newUtilities, ['hover'])
    },
    animate
  ]
}
