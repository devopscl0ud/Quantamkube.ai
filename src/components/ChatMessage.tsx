'use client';

import { Message } from '@/types';
import { Copy, Download } from 'lucide-react';
import { extractCodeBlocks, copyToClipboard, downloadFile } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from './ui/Button';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === 'assistant';
  const codeBlocks = extractCodeBlocks(message.content);

  const handleCopy = async (code: string) => {
    if (await copyToClipboard(code)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (code: string, language: string) => {
    const ext = language === 'yaml' || language === 'yml' ? 'yaml' : language || 'txt';
    downloadFile(code, `manifest.${ext}`);
  };

  return (
    <div className={`flex gap-4 mb-4 animate-fadeIn ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAssistant
            ? 'bg-gradient-to-r from-primary-cyan to-primary-teal'
            : 'bg-gradient-to-r from-primary-teal to-primary-purple-accent'
        }`}
      >
        {isAssistant ? '🤖' : '👤'}
      </div>

      {/* Message content */}
      <div className={`flex-1 ${isAssistant ? '' : 'max-w-2xl ml-auto'}`}>
        <div
          className={`message-bubble ${message.role} rounded-2xl p-4 backdrop-blur-sm ${
            isAssistant ? 'rounded-tl-none' : 'rounded-tr-none'
          }`}
        >
          {/* Text content */}
          {message.content && !codeBlocks.length && (
            <div className="prose prose-invert max-w-none text-white text-sm leading-relaxed">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  code: ({ children }) => (
                    <code className="bg-white/10 px-2 py-1 rounded text-primary-cyan-light">
                      {children}
                    </code>
                  ),
                  li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
                  ul: ({ children }) => <ul className="mb-2">{children}</ul>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Code blocks */}
          {codeBlocks.map((block, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-t-lg border-b border-white/10">
                <span className="text-xs font-mono text-primary-cyan uppercase">
                  {block.language || 'code'}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(block.code)}
                    className="text-xs"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDownload(block.code, block.language)}
                    className="text-xs"
                  >
                    <Download className="w-4 h-4" />
                    YAML
                  </Button>
                </div>
              </div>
              <pre className="code-block rounded-b-lg bg-white/5 overflow-x-auto">
                <code className="text-primary-cyan-light text-xs font-mono">{block.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
