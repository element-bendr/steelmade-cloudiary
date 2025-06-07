"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbItem } from "@/../types"; // Adjusted path to point to the root types.ts

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Generic JsonLd component for implementing structured data
 * Usage:
 * <JsonLd data={{ "@type": "Organization", name: "SteelMade", ... }} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  description?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
    contactOption?: string[];
  };
}

/**
 * OrganizationSchema component for structured data about the company
 */
export function OrganizationSchema({
  name = "SteelMade",
  url = "https://steelmade.com",
  logo = "https://steelmade.com/logo.png",
  sameAs = [
    "https://www.facebook.com/steelmade",
    "https://twitter.com/steelmade",
    "https://www.linkedin.com/company/steelmade",
  ],
  description = "Premium office furniture manufacturer specializing in high-quality steel products and custom solutions.",
  contactPoint = {
    telephone: "+1-800-STEEL-MADE",
    contactType: "customer service",
    email: "info@steelmade.com",
    contactOption: ["TollFree"],
  },
}: OrganizationSchemaProps = {}) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
    description,
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint,
    },
  };

  return <JsonLd data={schemaData} />;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbSchema component for navigation paths
 */
export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

interface ProductProps {
  product: {
    name: string;
    description: string;
    image: string;
    price: string;
    availability: "InStock" | "OutOfStock" | "PreOrder";
  }
}

export function ProductSchema({ product }: ProductProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "SteelMade"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": product.price.replace(/[^0-9.]/g, ''), // Removing any non-number characters except for decimal point
      "availability": `https://schema.org/${product.availability}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

/**
 * WebsiteSchema component for the overall website structured data
 */
export function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SteelMade",
    "url": "https://steelmade.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://steelmade.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

/**
 * LocalBusinessSchema component for physical locations
 */
export function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Furniture Store",
    name: "SteelMade Showroom",
    image: "https://steelmade.com/images/showroom.jpg",
    "@id": "https://steelmade.com/locations/headquarters",
    url: "https://steelmade.com",
    telephone: "+1-800-STEEL-MADE",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Design Avenue",
      addressLocality: "Chicago",
      addressRegion: "IL",
      postalCode: "60601",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.8781,
      longitude: -87.6298
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00"
      }
    ],
    priceRange: "$$$"
  };

  return <JsonLd data={schemaData} />;
}