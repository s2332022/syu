import React, { useState } from 'react';
import { LINK_DATA } from './constants';
import { LinkButton } from './components/LinkButton';
import { SingleLinkButton } from './components/SingleLinkButton';
import { EditModal } from './components/EditModal';
import { LinkItem } from './types';

const BASE_URL = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';

function App() {
  const [links, setLinks] = useState<LinkItem[]>(LINK_DATA);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);

  const handleEdit = (link: LinkItem) => {
    setEditingLink(link);
  };

  const handleCloseModal = () => {
    setEditingLink(null);
  };

  const handleSaveLink = (updatedLink: LinkItem) => {
    // 教室名から教室番号を抽出し、URLを再生成する
    const roomNumber = updatedLink.classroom.match(/\d+/)?.[0] || '';
    const finalLink = { ...updatedLink, url: `${BASE_URL}${roomNumber}` };
    
    setLinks(links.map(l => l.id === finalLink.id ? finalLink : l));
    setEditingLink(null);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-200 mb-2">
            出席
          </h1>
          <p className="text-lg text-slate-400">
            仮
          </p>
        </header>
        
        <div className="mb-8">
          <SingleLinkButton links={links} onEdit={handleEdit} />
        </div>
      </main>

      {editingLink && (
        <EditModal 
          link={editingLink}
          onClose={handleCloseModal}
          onSave={handleSaveLink}
        />
      )}
    </div>
  );
}

export default App;
