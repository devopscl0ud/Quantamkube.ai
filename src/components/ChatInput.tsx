'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Button from './ui/Button';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSubmit,
  isLoading = false,
  placeholder = 'Describe your Kubernetes manifest...',
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass p-4 rounded-2xl flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white resize-none outline-none placeholder-white/50 max-h-[120px]"
          rows={1}
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          size="lg"
          className="flex-shrink-0"
          loading={isLoading}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs text-white/50 mt-2">
        Shift + Enter for new line • Press Enter to send
      </p>
    </form>
  );
}
