'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn('google', { redirect: false });
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass p-6 rounded-xl space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

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
              required
            />

            <div className="flex items-center justify-between text-sm">
              <Link href="/auth/forgot-password" className="text-primary-cyan hover:text-primary-cyan-light transition">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading} className="gap-2">
              <LogIn className="w-5 h-5" />
              Sign In
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="secondary"
            fullWidth
            size="lg"
            onClick={handleGoogleSignIn}
            loading={loading}
          >
            Continue with Google
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-white/60 mt-6">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary-cyan hover:text-primary-cyan-light transition font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
