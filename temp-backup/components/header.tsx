"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { mainNavigation, type NavigationItem, type MegaMenuColumn } from '@/lib/data/navigation';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

/**
 * Header component with mobile-optimized mega menu
 * Implements responsive design, touch-friendly interactions, and performance optimizations
 */
interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  // Add debug logging
  useEffect(() => {
    console.log("Mobile menu open:", isMobileMenuOpen);
    console.log("Open section:", openMobileSection);
  }, [isMobileMenuOpen, openMobileSection]);

  const toggleMobileSection = useCallback((title: string) => {
    setOpenMobileSection(prev => prev === title ? null : title);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-sm",
        "supports-[backdrop-filter]:bg-background/60",
        className
      )} 
      role="banner"
    >      <div className="container relative flex h-16 items-center justify-between">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2" aria-label="Steelmade Home">
            <span 
              className={cn(
                "font-bold text-xl lg:text-2xl tracking-tight",
                "text-red-600", // Brand name always solid red
                "dark:text-red-500"
              )}
            >
              steelmade
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-center">
          <NavigationMenu className="w-full max-w-screen-xl mx-auto">
            <NavigationMenuList className="flex-row space-x-6 justify-center">
              {mainNavigation.map((item, idx) => (
                <NavigationMenuItem key={item.href}>
                  {item.megaMenu ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "px-3 py-2 text-sm font-medium",
                          "dark:text-white dark:hover:text-red-400",
                          "transition-colors duration-200",
                          "hover:bg-accent/50 rounded-md"
                        )}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className={cn(
                        idx === 0
                          ? "absolute left-0"
                          : idx === mainNavigation.length - 1
                            ? "absolute right-0"
                            : "absolute left-1/2 -translate-x-1/2"
                      )}>
                        <div className="w-[600px] max-w-[90vw] p-6 mt-2 shadow-lg rounded-lg bg-popover/95 backdrop-blur-sm">
                          {item.megaMenu.description && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {item.megaMenu.description}
                            </p>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {item.megaMenu.columns.map((column, idx) => (
                              <div key={idx} className="space-y-4">
                                {column.header && (
                                  <h3 className="font-medium text-foreground mb-3">
                                    {column.header}
                                  </h3>
                                )}
                                <ul className="space-y-3">
                                  {column.links.map((link) => (
                                    <li key={link.href}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={link.href}
                                          className={cn(
                                            "block select-none rounded-md p-3",
                                            "no-underline outline-none",
                                            "transition-colors duration-200",
                                            "hover:bg-accent hover:text-accent-foreground",
                                            "focus:bg-accent focus:text-accent-foreground",
                                            "text-foreground",
                                            "group"
                                          )}
                                        >
                                          <div className="text-sm font-medium group-hover:text-accent-foreground">
                                            {link.title}
                                          </div>
                                          {link.description && (
                                            <p className="line-clamp-2 text-xs text-muted-foreground mt-1 group-hover:text-accent-foreground/70">
                                              {link.description}
                                            </p>
                                          )}
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                                {column.featured && (
                                  <div className="mt-6 pt-6 border-t">
                                    <Link
                                      href={column.featured.href}
                                      className="block group rounded-lg overflow-hidden bg-muted hover:bg-accent transition-colors"
                                    >
                                      <div className="relative h-40 w-full">
                                        <Image
                                          src={column.featured.imageUrl}
                                          alt={column.featured.imageAlt}
                                          fill
                                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                      </div>
                                      <div className="p-4">
                                        <h4 className="text-sm font-medium group-hover:text-accent-foreground">
                                          {column.featured.title}
                                        </h4>
                                        {column.featured.description && (
                                          <p className="text-xs text-muted-foreground mt-1 group-hover:text-accent-foreground/70">
                                            {column.featured.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium",
                          "rounded-md transition-colors duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus:bg-accent focus:text-accent-foreground",
                          "dark:text-white dark:hover:text-red-400",
                          "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                          "after:h-[2px] after:w-0 hover:after:w-full",
                          "after:bg-gradient-to-r after:from-red-500 after:to-red-600",
                          "after:transition-all after:duration-300"
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="ml-4 flex items-center">
          <button 
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
              "dark:focus:ring-red-400"
            )}
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>      {/* Mobile Navigation - moved outside flex container for correct stacking and layout */}      <div 
        className={cn(
          "fixed inset-0 top-16 z-[9999] bg-background/98 backdrop-blur-md lg:hidden",
          "border-t shadow-lg",
          "transition-all duration-300 ease-in-out",
          "overflow-y-auto w-full h-[calc(100vh-4rem)]",
          isMobileMenuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible -translate-x-full"
        )}
        style={{
          willChange: 'transform, opacity, visibility'
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute inset-0 overflow-y-auto">
          <nav className="py-6 px-6">
            <ul className="space-y-3">
              {mainNavigation.map((item) => (
                <li key={item.href} className="border-b border-border/30 last:border-0 pb-2">
                  {item.megaMenu ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSection(item.title)}
                        className={cn(
                          "flex w-full items-center justify-between p-4 my-1",
                          "text-base font-medium rounded-md",
                          "hover:bg-accent/50 active:bg-accent",
                          "transition-colors duration-200",
                          openMobileSection === item.title ? "bg-accent/30" : ""
                        )}
                      >
                        {item.title}
                        <ChevronDown 
                          className={cn(
                            "h-5 w-5 transition-transform text-red-500",
                            openMobileSection === item.title ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      {openMobileSection === item.title && (
                        <div className="px-4 pb-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          {item.megaMenu.columns.map((column, colIdx) => (
                            <div key={colIdx} className="mb-5">
                              {column.header && (
                                <h4 className="font-medium text-sm mb-3 text-muted-foreground">
                                  {column.header}
                                </h4>
                              )}
                              <ul className="space-y-2 pl-2">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-accent group"
                                    >
                                      <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-red-500 transition-colors" />
                                      <span className="group-hover:text-red-500 transition-colors">{link.title}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {item.megaMenu.featured && (
                            <div className="mt-4 pt-4 border-t border-muted">
                                <Link
                                  href={item.megaMenu.featured.href}
                                  className="block group rounded-md overflow-hidden"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="relative h-32 w-full">
                                    <Image
                                      src={item.megaMenu.featured.imageUrl}
                                      alt={item.megaMenu.featured.imageAlt}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                  </div>
                                  <div className="p-3 bg-muted/50 group-hover:bg-accent/80 transition-colors">
                                    <h4 className="text-xs font-medium">
                                      {item.megaMenu.featured.title}
                                    </h4>
                                    {item.megaMenu.featured.description && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {item.megaMenu.featured.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between p-4 text-base font-medium hover:bg-accent/50 rounded-md group"
                    >
                      <span className="group-hover:text-red-500 transition-colors">{item.title}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>    </header>
  );
}

export default Header;
