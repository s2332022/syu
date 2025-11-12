import React from 'react';
import { LinkItem } from '../types';
import { LinkButton } from './LinkButton';

interface CategorySectionProps {
  title: string;
  links: LinkItem[];
  // FIX: Added onEditLink prop to handle edit functionality.
  onEditLink: (link: LinkItem) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ title, links, onEditLink }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-slate-300 border-b-2 border-slate-700 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <LinkButton key={link.id} link={link} onEdit={onEditLink} />
        ))}
      </div>
    </section>
  );
};
