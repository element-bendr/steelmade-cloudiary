import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-xl text-red-600">
              SteelMade
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium steel office furniture designed for modern workspaces.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-medium mb-3">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chairs" className="hover:text-red-600">Chairs</Link></li>
              <li><Link href="/desks" className="hover:text-red-600">Desks</Link></li>
              <li><Link href="/storage" className="hover:text-red-600">Storage</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-base font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-red-600">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-red-600">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-base font-medium mb-3">Connect With Us</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>123 Steel Avenue</p>
              <p>Chicago, IL 60601</p>
              <p className="mt-2">Email: info@steelmade.com</p>
              <p>Phone: (800) STEEL-MADE</p>
            </address>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SteelMade. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-red-600">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-red-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;