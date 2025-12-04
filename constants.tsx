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
  { id: '1', classroom: '7701教室', subject: '音響' },
  { id: '2', classroom: '7701教室', subject: 'オーディオ' },
  { id: '3', classroom: '7302教室', subject: 'ネットワーク' },
  { id: '4', classroom: '7303教室', subject: 'コンピュ' },
  { id: '5', classroom: '7302教室', subject: '情報倫理' },
  { id: '6', classroom: '615教室', subject: '経済' },
  { id: '7', classroom: '000', subject: '00' },
  { id: '8', classroom: '000', subject: '00' },
];

export const LINK_DATA: LinkItem[] = initialLinks.map((item) => {
  // 教室名から教室番号を抽出する（まず3桁の連続した数字を探す。なければ最後の数字列、なければ最初の数字列）
  const extractRoomNumber = (s: string) => {
    // 優先: 3桁の連続した数字（例: 615）
    const three = s.match(/\d{3}/);
    if (three) return three[0];
    // 次に最後の数字列
    const all = s.match(/\d+/g);
    if (all && all.length > 0) return all[all.length - 1];
    // 最後の手段で最初の数字列
    return '';
  };
  const roomNumber = extractRoomNumber(item.classroom || '');
  return {
    ...item,
    url: `${BASE_URL}${roomNumber}`,
    icon: ClassroomIcon,
  };
});
