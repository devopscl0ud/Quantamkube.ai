'use client';

import { useState } from 'react';
import { Chat } from '@/types';
import { Trash2, Edit2 } from 'lucide-react';

interface SidebarProps {
  chats: Chat[];
  activeChat?: string;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, title: string) => void;
}

export default function Sidebar({
  chats,
  activeChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleRename = (id: string, title: string) => {
    onRenameChat(id, editingTitle || title);
    setEditingId(null);
  };

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`group flex items-center gap-2 p-3 rounded-lg transition-all ${
            activeChat === chat.id
              ? 'bg-white/15 border border-primary-cyan/50'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          {editingId === chat.id ? (
            <input
              autoFocus
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={() => handleRename(chat.id, chat.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename(chat.id, chat.title);
                if (e.key === 'Escape') setEditingId(null);
              }}
              className="flex-1 bg-transparent text-white text-sm outline-none"
            />
          ) : (
            <>
              <button
                onClick={() => onSelectChat(chat.id)}
                className="flex-1 text-left text-white/80 hover:text-white text-sm truncate"
              >
                {chat.title}
              </button>
              <button
                onClick={() => {
                  setEditingId(chat.id);
                  setEditingTitle(chat.title);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition"
              >
                <Edit2 className="w-4 h-4 text-white/60" />
              </button>
              <button
                onClick={() => onDeleteChat(chat.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
