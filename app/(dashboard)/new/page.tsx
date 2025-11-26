'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatInput from '@/components/ChatInput';
import { Sparkles } from 'lucide-react';

export default function NewChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, chatId: null }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      // Read the response to get the chat ID from headers or response
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      // For now, redirect to a new chat page - in production this would be dynamic
      // We'll use a better approach after getting the chat ID
      await res.text();
      
      // Redirect back to dashboard which will load the latest chat
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-cyan to-primary-teal flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary-dark" />
        </div>
        <h1 className="text-4xl font-bold gradient-text-cyan mb-4">Start a New Chat</h1>
        <p className="text-white/60 text-lg">
          Describe what Kubernetes resources or configuration you need. QuantamKube AI will generate production-ready manifests instantly.
        </p>
      </div>

      {/* Quick Examples */}
      <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-2xl w-full">
        {[
          {
            title: 'Deploy a Web App',
            description: 'Create Deployment, Service, and Ingress manifests',
          },
          {
            title: 'Setup CI/CD',
            description: 'Generate GitHub Actions workflow for your app',
          },
          {
            title: 'Database Setup',
            description: 'Create StatefulSet manifests for PostgreSQL',
          },
          {
            title: 'Monitoring Stack',
            description: 'Setup Prometheus and Grafana on Kubernetes',
          },
        ].map((example, idx) => (
          <button
            key={idx}
            className="glass p-6 text-left hover:bg-white/15 transition group cursor-pointer"
            onClick={() => handleSendMessage(example.description)}
            disabled={isLoading}
          >
            <h3 className="font-semibold text-white group-hover:text-primary-cyan-light transition">
              {example.title}
            </h3>
            <p className="text-sm text-white/60 mt-1">{example.description}</p>
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="w-full max-w-2xl">
        <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
