export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  geminiApiKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StreamMessage {
  type: 'text' | 'code' | 'error';
  content: string;
  language?: string;
}
