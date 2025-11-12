import React, { useState, useEffect } from 'react';
import { LinkItem } from '../types';

interface EditModalProps {
  link: LinkItem;
  onClose: () => void;
  onSave: (updatedLink: LinkItem) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ link, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    classroom: link.classroom,
    subject: link.subject,
  });

  useEffect(() => {
    setFormData({
      classroom: link.classroom,
      subject: link.subject,
    });
  }, [link]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...link, ...formData });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()} // モーダル内のクリックで閉じないようにする
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-200">情報を編集</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="classroom" className="block text-sm font-medium text-slate-400 mb-1">教室</label>
            <input
              type="text"
              name="classroom"
              id="classroom"
              value={formData.classroom}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-1">授業</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-600 text-slate-200 rounded-md hover:bg-slate-500 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-500 transition-colors"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
