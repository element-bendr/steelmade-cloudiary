"use client";

import React from 'react';
import ContactForm from '../../components/contact/contact-form';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/seo/structured-data';

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" }
  ];

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <p className="text-lg text-center max-w-3xl mx-auto">
        Have questions about our steel products or services? Need a custom solution? 
        Get in touch with our team and we&apos;ll get back to you as soon as possible.
      </p>
      
      <ContactForm />

      <div className="hidden">
        <OrganizationSchema />
        <BreadcrumbSchema items={breadcrumbItems} />
      </div>
    </div>
  );
}
