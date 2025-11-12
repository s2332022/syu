import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  link: LinkItem;
  onEdit: (link: LinkItem) => void;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ link, onEdit }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault(); // リンクへの遷移を防ぐ
    e.stopPropagation(); // イベントの伝播を止める
    onEdit(link);
  };

  return (
    <div className="relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-sky-500 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 h-full"
      >
        <div className="flex flex-col items-center text-center">
          {link.icon}
          <h3 className="text-lg font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
            {link.classroom} - {link.subject}
          </h3>
        </div>
      </a>
      <button
        onClick={handleEditClick}
        className="absolute top-2 right-2 p-1.5 rounded-full text-slate-500 hover:bg-slate-700 hover:text-slate-200 transition-colors duration-200"
        aria-label="編集"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
