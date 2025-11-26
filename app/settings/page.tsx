'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Key, Save, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [geminiKey, setGeminiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, router]);

  const handleSave = async () => {
    if (!geminiKey.trim()) {
      setError('Gemini API key is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ geminiApiKey: geminiKey }),
      });

      if (!res.ok) {
        throw new Error('Failed to save settings');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text-cyan mb-2">Settings</h1>
        <p className="text-white/60">Manage your QuantamKube AI settings</p>
      </div>

      <div className="space-y-8">
        {/* API Key Section */}
        <div className="glass p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-cyan/20 to-primary-teal/20 flex items-center justify-center text-primary-cyan">
              <Key className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold">API Key</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Google Gemini API Key
              </label>
              <p className="text-sm text-white/60 mb-4">
                Get your API key from{' '}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-cyan hover:text-primary-cyan-light transition"
                >
                  Google AI Studio
                </a>
              </p>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="input-primary w-full font-mono text-sm"
              />
              <p className="text-xs text-white/50 mt-2">
                Your API key is encrypted and only used to generate Kubernetes manifests.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {saved && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-green-300 text-sm">Settings saved successfully!</p>
              </div>
            )}

            <Button
              onClick={handleSave}
              loading={loading}
              className="gap-2"
              size="lg"
            >
              <Save className="w-5 h-5" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Account Section */}
        <div className="glass p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Email
              </label>
              <p className="text-white/60">{session.user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">
                Name
              </label>
              <p className="text-white/60">{session.user?.name}</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="glass p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">About</h2>
          <div className="space-y-2 text-white/60 text-sm">
            <p>
              <span className="text-white font-semibold">QuantamKube AI</span> v1.0.0
            </p>
            <p>
              Kubernetes manifests in seconds, powered by Gemini
            </p>
            <p className="pt-4">
              <a
                href="https://github.com/devopscl0ud/Quantamkube.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-cyan hover:text-primary-cyan-light transition"
              >
                View on GitHub →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
