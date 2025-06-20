import React from 'react';
import { productStyles } from '@/lib/styles/productStyles';

interface ChairFeatureListProps {
  features: string[] | undefined;
  className?: string;
}

export const ChairFeatureList: React.FC<ChairFeatureListProps> = ({
  features = [],
  className = '',
}) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className={`${productStyles.components.featureList.container} ${className}`}>
      <h3 className={productStyles.typography.sectionHeading}>Features</h3>
      <ul className={productStyles.components.featureList.grid}>
        {features.map((feature, index) => (
          <li key={index} className={productStyles.components.featureList.item}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={productStyles.components.featureList.icon}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className={productStyles.typography.featureText}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChairFeatureList;