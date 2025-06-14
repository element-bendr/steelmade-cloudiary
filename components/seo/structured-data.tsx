"use client";
import React from 'react';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
}

export function OrganizationSchema({
  name = "SteelMade",
  url = "https://steelmade.com",
  logo = "https://steelmade.com/logo.png",
  contactPoint = {
    telephone: "+1-800-STEEL-MADE",
    contactType: "customer service"
  }
}: OrganizationSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    contactPoint
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  sku: string;
  brand?: string;
}

export function ProductSchema({
  name,
  description,
  image,
  sku,
  brand = "SteelMade"
}: ProductSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    item: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
