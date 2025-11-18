import React from 'react';
import { LinkItem } from './types';

const ClassroomIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-4 text-slate-400 group-hover:text-sky-400 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const BASE_URL = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';

const initialLinks: Omit<LinkItem, 'url' | 'icon'>[] = [
  { id: '1', classroom: '7001教室', subject: '音響' },
  { id: '2', classroom: '7001教室', subject: 'オーディオ' },
  { id: '3', classroom: '7302教室', subject: 'ネットワーク' },
  { id: '4', classroom: '7303教室', subject: 'コンピュ' },
  { id: '5', classroom: '7302教室', subject: '情報倫理' },
  { id: '6', classroom: '6105教室', subject: '経済' },
  { id: '7', classroom: '000', subject: '00' },
  { id: '8', classroom: '000', subject: '00' },
];

export const LINK_DATA: LinkItem[] = initialLinks.map((item) => {
  // 「334教室」から数字の「334」を抽出する
  const roomNumber = item.classroom.match(/\d+/)?.[0] || '';
  return {
    ...item,
    url: `${BASE_URL}${roomNumber}`,
    icon: ClassroomIcon,
  };
});
