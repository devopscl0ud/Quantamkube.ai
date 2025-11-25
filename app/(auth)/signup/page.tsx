'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to sign up');
      }

      router.push('/auth/login?message=Account created successfully. Please sign in.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark to-primary-dark opacity-90" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-teal/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md animate-slideInRight">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-cyan to-primary-teal rounded-lg flex items-center justify-center">
              ⚡
            </div>
            <span className="text-xl font-bold gradient-text-cyan">QuantamKube AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/60">Join thousands of DevOps engineers</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass p-6 rounded-xl space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <Input
              icon={<User className="w-5 h-5" />}
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />

            <Input
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Input
              icon={<Lock className="w-5 h-5" />}
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              helperText="At least 8 characters"
              required
            />

            <Input
              icon={<Lock className="w-5 h-5" />}
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" fullWidth size="lg" loading={loading} className="gap-2 mt-6">
              <UserPlus className="w-5 h-5" />
              Create Account
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-white/50 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>

        {/* Sign in link */}
        <p className="text-center text-white/60 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-cyan hover:text-primary-cyan-light transition font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
