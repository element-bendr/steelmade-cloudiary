"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ProductType, getAllSeries } from "@/lib/services/product-service";
import { mainNavigation } from "@/lib/data/navigation";
import { cn } from "@/lib/utils"; // Added import for cn

// Define the type for series data
interface SeriesMetadata {
  title: string;
  description: string;
  // Add other properties as needed
}

// Define type for submenu item
interface SubmenuItem {
  title: string;
  href: string;
}

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [chairsData, setChairsData] = useState<Record<string, SeriesMetadata> | null>(null);
  const [desksData, setDesksData] = useState<Record<string, SeriesMetadata> | null>(null);
  const [storageData, setStorageData] = useState<Record<string, SeriesMetadata> | null>(null);
  const [expandedSeries, setExpandedSeries] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [chairs, desks, storage] = await Promise.all([
          getAllSeries("chairs"),
          getAllSeries("desks"),
          getAllSeries("storage-solutions"), // Changed "storage" to "storage-solutions"
        ]);

        setChairsData(chairs);
        setDesksData(desks);
        setStorageData(storage);
      } catch (error) {
        console.error("Error loading product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle expanded series in mobile menu
  const toggleExpandedSeries = (categoryType: string, seriesId: string) => {
    setExpandedSeries((prev) => {
      const key = `${categoryType}-${seriesId}`;
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  // Helper function to render product series for desktop
  const renderSeriesLinks = (productType: ProductType, seriesData: Record<string, SeriesMetadata> | null) => {
    if (!seriesData) return <div className="p-4 text-sm">Loading...</div>;

    return (
      <div className="grid gap-3 p-4 md:w-[500px] lg:w-[600px]">
        {Object.entries(seriesData).map(([seriesId, series]) => (
          <div
            key={seriesId}
            className="border rounded-lg p-3 hover:bg-accent/20 transition-colors"
          >
            <Link
              href={`/${productType}/${seriesId}`}
              className="font-medium mb-1 block"
              onClick={() => setIsOpen(false)}
            >
              {series.title}
              <span className="text-muted-foreground text-sm ml-2">→</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
              {series.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Helper function to render submenu items for MainNav items
  const renderSubmenuItems = (submenu: SubmenuItem[] | undefined) => {
    if (!submenu) return null;

    return (
      <div className="grid gap-3 p-4 md:w-[400px]">
        {submenu.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 hover:bg-accent/20 transition-colors"
          >
            <Link
              href={item.href}
              className="font-medium mb-1 block"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
              <span className="text-muted-foreground text-sm ml-2">→</span>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/15 border-b border-white/20">
      <div className="container flex h-16 items-center justify-between px-4 transition-all duration-300">
        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="p-2 md:hidden hover:bg-accent/50 rounded-lg transition-colors">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] backdrop-blur-sm bg-white/80 border-r border-white/20 overflow-y-auto"
          >
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                SteelMade
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="block w-full px-4 py-3 rounded-lg hover:bg-white/30 active:bg-white/20 transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Product Category Accordions */}
              <Accordion type="single" collapsible className="w-full">
                {/* Chairs Accordion */}
                <AccordionItem value="chairs">
                  <AccordionTrigger className="px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                    Chairs
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l border-white/20 ml-4 flex flex-col gap-2">
                      <Link
                        href="/chairs"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        All Chairs
                      </Link>

                      {chairsData &&
                        Object.entries(chairsData).map(
                          ([seriesId, series]) => (
                            <div key={seriesId} className="w-full">
                              <Collapsible>
                                <CollapsibleTrigger
                                  className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all block w-full text-left flex items-center justify-between"
                                  onClick={() =>
                                    toggleExpandedSeries("chairs", seriesId)
                                  }
                                >
                                  {series.title}
                                  <ChevronRight
                                    className={`h-4 w-4 transition-transform ${
                                      expandedSeries[`chairs-${seriesId}`]
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                  />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-8 pb-2">
                                  {/* Link to the series page */}
                                  <Link
                                    href={`/chairs/${seriesId}`}
                                    className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-all text-sm text-muted-foreground"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    All {series.title} Products
                                  </Link>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          )
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Desks Accordion */}
                <AccordionItem value="desks">
                  <AccordionTrigger className="px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                    Desks
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l border-white/20 ml-4 flex flex-col gap-2">
                      <Link
                        href="/desks"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        All Desks
                      </Link>

                      {desksData &&
                        Object.entries(desksData).map(
                          ([seriesId, series]) => (
                            <div key={seriesId} className="w-full">
                              <Collapsible>
                                <CollapsibleTrigger
                                  className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all block w-full text-left flex items-center justify-between"
                                  onClick={() =>
                                    toggleExpandedSeries("desks", seriesId)
                                  }
                                >
                                  {series.title}
                                  <ChevronRight
                                    className={`h-4 w-4 transition-transform ${
                                      expandedSeries[`desks-${seriesId}`]
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                  />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-8 pb-2">
                                  {/* Link to the series page */}
                                  <Link
                                    href={`/desks/${seriesId}`}
                                    className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-all text-sm text-muted-foreground"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    All {series.title} Products
                                  </Link>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          )
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Storage Solutions Accordion */}
                <AccordionItem value="storage-solutions">
                  <AccordionTrigger className="px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                    Storage Solutions
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l border-white/20 ml-4 flex flex-col gap-2">
                      <Link
                        href="/storage-solutions"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        All Storage Solutions
                      </Link>
                      <Link
                        href="/storage-solutions/metal-storages"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Metal Storages
                      </Link>
                      <Link
                        href="/storage-solutions/compactor-systems"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Compactor Systems
                      </Link>
                      <Link
                        href="/storage-solutions/lockers"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Lockers
                      </Link>
                      <Link
                        href="/storage-solutions/cabinets"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Cabinets
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Racking Systems Accordion */}
                <AccordionItem value="racking-systems">
                  <AccordionTrigger className="px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                    Racking Systems
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l border-white/20 ml-4 flex flex-col gap-2">
                      <Link
                        href="/racking-systems"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        All Racking Systems
                      </Link>
                      <Link
                        href="/racking-systems/pallet-racks"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Pallet Racks
                      </Link>
                      <Link
                        href="/racking-systems/long-span-racks"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Long Span Racks
                      </Link>
                      <Link
                        href="/racking-systems/slotted-angle-racks"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        Slotted Angle Racks
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* School Furniture */}
                <AccordionItem value="school-furniture">
                  <AccordionTrigger className="px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                    School Furniture
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l border-white/20 ml-4 flex flex-col gap-2">
                      <Link
                        href="/school-furniture"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        All School Furniture
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Hospital Furniture */}
                <AccordionItem value="hospital-furniture">
                  <AccordionTrigger className="px-4 py-3 hover:bg-white/10 rounded-lg transition-all">
                    Hospital Furniture
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l border-white/20 ml-4 flex flex-col gap-2">
                      <Link
                        href="/hospital-furniture"
                        className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        All Hospital Furniture
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                href="/about"
                className="block w-full px-4 py-3 rounded-lg hover:bg-white/30 active:bg-white/20 transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block w-full px-4 py-3 rounded-lg hover:bg-white/30 active:bg-white/20 transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Theme Toggle - Mobile */}
              <div className="px-4 py-2">
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo - Centered on mobile */}
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:shadow-morphism absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            SteelMade
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-grow justify-center">
          <NavigationMenuList>
            {mainNavigation.map((navItem, index) => (
              <NavigationMenuItem key={index}>
                {navItem.megaMenu ? (
                  <>
                    <NavigationMenuTrigger
                      className={navigationMenuTriggerStyle()}
                    >
                      {navItem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {navItem.megaMenu.featured && (
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={navItem.megaMenu.featured.href}
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {navItem.megaMenu.featured.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {navItem.megaMenu.featured.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        )}
                        {navItem.megaMenu.columns.map((column, colIndex) => (
                          <React.Fragment key={colIndex}>
                            {column.header && (
                              <li className="font-semibold text-sm text-foreground py-1 px-2">
                                {column.header}
                              </li>
                            )}
                            {column.links.map((link, linkIndex) => (
                              <ListItem
                                key={linkIndex}
                                href={link.href}
                                title={link.title}
                                onClick={() => setIsOpen(false)}
                              >
                                {link.description}
                              </ListItem>
                            ))}
                          </React.Fragment>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : navItem.href ? (
                  <Link href={navItem.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={pathname === navItem.href}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <NavigationMenuTrigger
                    className={navigationMenuTriggerStyle()}
                    disabled
                  >
                    {navItem.title}
                  </NavigationMenuTrigger>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;