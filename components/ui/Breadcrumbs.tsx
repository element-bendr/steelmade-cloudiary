// Converted to a server component for better performance
import Link from 'next/link';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Using Heroicons

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className || ''}`}>
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-gray-700 transition-colors">
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {item.href ? (
              <Link
                href={item.href}
                className="ml-1 hover:text-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="ml-1 text-gray-700 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
