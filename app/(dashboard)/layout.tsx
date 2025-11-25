'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Plus, Settings, LogOut, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Chat } from '@/types';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    fetchChats();
  }, [session, router]);

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/chat');
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats || []);
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    router.push('/dashboard/new');
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true });
  };

  if (!session) return null;

  return (
    <div className="flex h-screen bg-primary-dark">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-white/5 border-r border-white/10 flex flex-col overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-teal rounded-lg flex items-center justify-center text-xs font-bold">
              ⚡
            </div>
            <span className="font-bold text-white hidden md:block">QuantamKube</span>
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-white/10">
          <Button fullWidth variant="secondary" size="md" onClick={handleNewChat} className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">New Chat</span>
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-white/10 rounded-lg" />
              ))}
            </div>
          ) : chats.length === 0 ? (
            <p className="text-white/50 text-sm text-center py-8">No chats yet. Start a new one!</p>
          ) : (
            chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/dashboard/chat/${chat.id}`}
                className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-white/80 hover:text-white text-sm truncate group"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-4 space-y-2">
          <Link href="/settings">
            <Button fullWidth variant="ghost" size="md" className="gap-2 justify-start">
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </Link>
          <Button fullWidth variant="ghost" size="md" onClick={handleSignOut} className="gap-2 justify-start">
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/10 flex items-center px-6 bg-white/5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="text-sm text-white/80">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-white/50">{session.user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-cyan to-primary-teal flex items-center justify-center text-primary-dark font-bold">
              {session.user?.name?.charAt(0) || '?'}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
