import React, { useEffect, useMemo, useState } from 'react';
import { LinkItem } from '../types';

interface Props {
  links: LinkItem[];
  onEdit: (link: LinkItem) => void;
}

// Returns index (0-based) of the active link according to the schedule described by the user.
function getActiveIndex(date: Date): number {
  const day = date.getDay(); // 0 Sun,1 Mon,2 Tue,3 Wed,4 Thu
  const hour = date.getHours();
  // Tue 10-11 -> first (index 0)
  if (day === 2 && hour >= 10 && hour < 11) return 0;
  // Tue 13-14 -> second (index 1)
  if (day === 2 && hour >= 13 && hour < 14) return 1;
  // Wed 9-10 -> third (index 2)
  if (day === 3 && hour >= 9 && hour < 10) return 2;
  // Wed 11-12 -> fourth (index 3)
  if (day === 3 && hour >= 11 && hour < 12) return 3;
  // Wed 15-16 -> fifth (index 4)
  if (day === 3 && hour >= 15 && hour < 16) return 4;
  // Thu 11-12 -> sixth (index 5)
  if (day === 4 && hour >= 11 && hour < 12) return 5;

  // Outside scheduled times -> return -1 to indicate '時間外'
  return -1;
}

export const SingleLinkButton: React.FC<Props> = ({ links, onEdit }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update every 30 seconds so the active link flips shortly after a boundary.
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const activeIndex = useMemo(() => getActiveIndex(now), [now]);

  const isActive = activeIndex >= 0 && activeIndex < links.length;
  const activeLink = isActive ? links[activeIndex] : null;

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeLink) onEdit(activeLink);
  };

  // When outside scheduled times, show a disabled card with "時間外です"
  if (!isActive) {
    return (
      <div className="relative max-w-md mx-auto">
        <div className="group block bg-slate-900 p-6 rounded-lg border border-slate-800 text-center opacity-60 cursor-not-allowed">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold text-slate-400">時間外です</h3>
            <p className="text-sm text-slate-500 mt-2">現在出席可能な授業はありません</p>
          </div>
        </div>
        <button
          disabled
          className="absolute top-2 right-2 p-1.5 rounded-full text-slate-500 bg-transparent cursor-not-allowed"
          aria-label="編集不可"
          title="時間外のため編集できません"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  }

  if (!activeLink) return null;

  return (
    <div className="relative max-w-md mx-auto">
      <a
        href={activeLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-sky-500 hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex flex-col items-center text-center">
          {activeLink.icon}
          <h3 className="text-2xl font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
            {activeLink.classroom} - {activeLink.subject}
          </h3>
          <p className="text-sm text-slate-400 mt-2">現在の時間に応じたリンクが開きます</p>
        </div>
      </a>

      <button
        onClick={handleEditClick}
        className="absolute top-2 right-2 p-1.5 rounded-full text-slate-500 hover:bg-slate-700 hover:text-slate-200 transition-colors duration-200"
        aria-label="編集"
        title="この時間帯のリンクを編集"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
