/**
 * Main navigation configuration for the Steelmade website
 * Implements a mega menu structure with support for multiple columns,
 * featured items, and rich content organization
 */

export interface MegaMenuFeatured {
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  description?: string;
}

export interface MegaMenuLink {
  title: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  header?: string;
  links: MegaMenuLink[];
  featured?: MegaMenuFeatured;
}

export interface MegaMenu {
  columns: MegaMenuColumn[];
  description?: string;
  featured?: MegaMenuFeatured; // Added optional featured property here
}

export interface NavigationItem {
  title: string;
  href: string;
  megaMenu?: MegaMenu;
}

export const mainNavigation: NavigationItem[] = [
    {
      title: "Modular",
      href: "/modular-furniture",
      megaMenu: {
        description: "Create flexible and efficient workspaces with our modular furniture solutions",
        columns: [
          {
            header: "Office Systems",
            links: [
              {
                title: "Office Modules",
                href: "/modular-furniture/office-modules",
                description: "Customizable office modules for any workspace"
              },
              {
                title: "Workstations",
                href: "/modular-furniture/workstations",
                description: "Ergonomic workstations for maximum productivity"
              }
            ],
            featured: {
              title: "New: Modern Workstation Pro",
              href: "/modular-furniture/workstations/modern-pro",
              imageUrl: "/images/placeholder/featured-product.jpg",
              imageAlt: "Modern Workstation Pro",
              description: "Discover our latest ergonomic workstation design"
            }
          },
          {
            header: "Partitions",
            links: [
              {
                title: "Partition Systems",
                href: "/modular-furniture/partition-systems",
                description: "Flexible space division solutions"
              }
            ]
          }
        ]
      }
    },
  {
    title: "Office Chairs & Seating",
    href: "/chairs",
    megaMenu: {
      description: "Experience comfort and style with our premium seating collection",
      columns: [
        {
          header: "Premium Collections",
          links: [
            {
              title: "Director Series",
              href: "/chairs/director-series",
              description: "Exclusive director chairs"
            },
            {
              title: "Executive Series",
              href: "/chairs/executive-series",
              description: "Premium executive seating"
            },
            {
              title: "Visitor's Series",
              href: "/chairs/visitor-series",
              description: "Poetic visitor seating for every guest"
            }
          ],
          featured: {
            title: "Featured: Executive Pro Chair",
            href: "/chairs/executive-series/pro",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Executive Pro Chair",
            description: "Ultimate comfort meets sophisticated design"
          }
        },
        {
          header: "Ergonomic Solutions",
          links: [
            {
              title: "Ergonomic Series",
              href: "/chairs/ergonomic-series",
              description: "Science-backed ergonomic designs"
            }
          ]
        }
      ]
    }
  },
  {
    title: "Storage Solutions",
    href: "/storage-solutions",
    megaMenu: {
      description: "Optimize your space with our comprehensive storage solutions",
      columns: [
        {
          header: "Storage Systems",
          links: [
            {
              title: "Metal Storages",
              href: "/storage-solutions/metal-storages",
              description: "Durable metal storage solutions"
            },
            {
              title: "Compactor Systems",
              href: "/storage-solutions/compactor-systems",
              description: "Space-saving compactor systems"
            }
          ]
        },
        {
          header: "Personal Storage",
          links: [
            {
              title: "Lockers",
              href: "/storage-solutions/lockers",
              description: "Secure personal storage options"
            },
            {
              title: "Cabinets",
              href: "/storage-solutions/cabinets",
              description: "Versatile cabinet solutions"
            }
          ],
          featured: {
            title: "New: Smart Locker System",
            href: "/storage-solutions/lockers/smart",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Smart Locker System",
            description: "Intelligent storage for modern workplaces"
          }
        }
      ]
    }
  },
  {
    title: "Racking Systems",
    href: "/racking-systems",
    megaMenu: {
      description: "Industrial-strength racking solutions for any storage need",
      columns: [
        {
          header: "Industrial Racks",
          links: [
            {
              title: "Pallet Racks",
              href: "/racking-systems/pallet-racks",
              description: "Heavy-duty pallet storage"
            },
            {
              title: "Long Span Racks",
              href: "/racking-systems/long-span-racks",
              description: "Extended storage solutions"
            }
          ]
        },
        {
          header: "Specialized Systems",
          links: [
            {
              title: "Slotted Angle Racks",
              href: "/racking-systems/slotted-angle-racks",
              description: "Versatile angle racking systems"
            }
          ],
          featured: {
            title: "Featured: Heavy Duty Pallet Rack",
            href: "/racking-systems/pallet-racks/heavy-duty",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Heavy Duty Pallet Rack",
            description: "Maximum strength and durability"
          }
        }
      ]
    }
  },
  {
    title: "School Furniture",
    href: "/school-furniture",
    megaMenu: {
      description: "Create inspiring learning environments with our educational furniture",
      columns: [
        {
          header: "Classroom Essentials",
          links: [
            {
              title: "Classroom Seating",
              href: "/school-furniture/classroom-seating",
              description: "Comfortable student seating"
            },
            {
              title: "Desks & Tables",
              href: "/school-furniture/desks-tables",
              description: "Durable classroom furniture"
            }
          ],
          featured: {
            title: "New: Ergonomic Student Chair",
            href: "/school-furniture/classroom-seating/ergonomic",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Ergonomic Student Chair",
            description: "Designed for all-day comfort"
          }
        },
        {
          header: "Specialized Areas",
          links: [
            {
              title: "Library Furniture",
              href: "/school-furniture/library-furniture",
              description: "Complete library furnishing solutions"
            }
          ]
        }
      ]
    }
  },
  {
    title: "Hospital Furniture",
    href: "/hospital-furniture",
    megaMenu: {
      description: "Healthcare furniture designed for comfort and functionality",
      columns: [
        {
          header: "Patient Care",
          links: [
            {
              title: "Patient Room Furniture",
              href: "/hospital-furniture/patient-room",
              description: "Complete patient room solutions"
            },
            {
              title: "Medical Carts",
              href: "/hospital-furniture/medical-carts",
              description: "Mobile medical storage"
            }
          ]
        },
        {
          header: "Common Areas",
          links: [
            {
              title: "Waiting Area Seating",
              href: "/hospital-furniture/waiting-area",
              description: "Comfortable waiting room furniture"
            }
          ],
          featured: {
            title: "Featured: Antimicrobial Seating",
            href: "/hospital-furniture/waiting-area/antimicrobial",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Antimicrobial Waiting Area Seating",
            description: "Safe and comfortable seating solutions"
          }
        }
      ]
    }
  },
  {
    title: "Company",
    href: "#",
    megaMenu: {
      description: "Learn about Steelmade, our services, and how we can help you",
      columns: [
        {
          header: "About Steelmade",
          links: [
            {
              title: "About Us",
              href: "/about",
              description: "Learn about our history and values"
            },
            {
              title: "Contact Us",
              href: "/contact",
              description: "Get in touch with our team"
            }
          ],
          featured: {
            title: "Our Story",
            href: "/about",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Steelmade Company Overview",
            description: "Discover our journey and commitment to quality"
          }
        },
        {
          header: "Services",
          links: [
            {
              title: "All Services",
              href: "/services",
              description: "Our comprehensive service offerings"
            },
            {
              title: "Installation",
              href: "/services/installation",
              description: "Professional installation services"
            },
            {
              title: "Maintenance",
              href: "/services/maintenance",
              description: "Furniture care and maintenance"
            }
          ],
          featured: {
            title: "Custom Design Service",
            href: "/services/custom-design",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Custom Furniture Design Service",
            description: "Create your perfect workspace with our design experts"
          }
        },
        {
          header: "Projects & Resources",
          links: [
            {
              title: "Portfolio",
              href: "/portfolio",
              description: "View our completed projects"
            },
            {
              title: "Case Studies",
              href: "/portfolio/case-studies",
              description: "Detailed project success stories"
            },
            {
              title: "Resources",
              href: "/resources",
              description: "Guides and documentation"
            },
            {
              title: "FAQ",
              href: "/faq",
              description: "Frequently asked questions"
            }
          ],
          featured: {
            title: "Product Care Guide",
            href: "/resources/product-care",
            imageUrl: "/images/placeholder/featured-product.jpg",
            imageAlt: "Furniture Care Guide",
            description: "Expert tips for maintaining your furniture"
          }
        }
      ]
    }
  }
];
