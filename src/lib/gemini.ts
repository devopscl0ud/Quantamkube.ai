import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('NEXT_PUBLIC_GEMINI_API_KEY is not set. Gemini features will not work.');
}

const client = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const getGeminiModel = () => {
  if (!client) {
    throw new Error('Gemini API key is not configured');
  }
  return client.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

export const getGeminiProModel = () => {
  if (!client) {
    throw new Error('Gemini API key is not configured');
  }
  return client.getGenerativeModel({ model: 'gemini-1.5-pro' });
};

export const generateContent = async (prompt: string, apiKey?: string) => {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) {
    throw new Error('Gemini API key is not configured');
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const streamGenerateContent = async (prompt: string, apiKey?: string) => {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) {
    throw new Error('Gemini API key is not configured');
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const stream = model.generateContentStream(prompt);
  return stream;
};

export const createKubernetesPrompt = (userPrompt: string, context: string[] = []) => {
  const contextStr = context.length > 0 ? `\n\nContext from previous messages:\n${context.join('\n')}` : '';
  
  return `You are an expert Kubernetes and DevOps engineer. You help users generate production-ready Kubernetes manifests, Docker files, CI/CD configurations, and other infrastructure-as-code files.

IMPORTANT RULES:
1. Always output valid YAML/JSON - test it before responding
2. Include comments explaining critical sections
3. Add best practices for security, scalability, and monitoring
4. For manifests: use proper namespaces, labels, and annotations
5. Include resource requests/limits for production workloads
6. Add health checks (liveness/readiness probes)
7. Use latest stable API versions
8. Never output incomplete or partial code

User Request: ${userPrompt}${contextStr}

Generate the appropriate configuration file(s). If multiple files are needed, clearly separate them with section headers like:
---
# filename.yaml
---

Always explain what was generated and why.`;
};
