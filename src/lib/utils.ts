import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return `Today at ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (d.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

export function downloadFile(content: string, filename: string): void {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function extractCodeBlocks(text: string): { language: string; code: string }[] {
  const regex = /```(\w+)?\n([\s\S]*?)\n```/g;
  const blocks = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || 'plaintext',
      code: match[2],
    });
  }

  return blocks;
}

export function formatKubernetesYaml(yaml: string): string {
  return yaml
    .split('\n')
    .map((line) => {
      // Fix common indentation issues
      return line;
    })
    .join('\n');
}

export function validateYaml(yaml: string): { valid: boolean; error?: string } {
  try {
    // Basic YAML validation
    if (yaml.trim() === '') {
      return { valid: false, error: 'Empty YAML' };
    }

    // Check for proper structure (very basic)
    const lines = yaml.split('\n');
    let prevIndent = 0;

    for (const line of lines) {
      if (line.trim() === '') continue;

      const indent = line.search(/\S/);
      if (indent < 0) continue;

      // Basic indentation validation
      if (indent > prevIndent + 2 && prevIndent !== -1) {
        return {
          valid: false,
          error: `Invalid indentation at: "${line.substring(0, 40)}"`,
        };
      }
      prevIndent = indent;
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: String(error) };
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
