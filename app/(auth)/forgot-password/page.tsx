'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, this would send a reset email
      // For now, just show success message
      setSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
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
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-white/60">Enter your email to receive a reset link</p>
        </div>

        {submitted ? (
          <div className="glass p-6 rounded-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-white font-semibold">Check your email</p>
            <p className="text-white/60 text-sm">
              We've sent a password reset link to <span className="text-primary-cyan">{email}</span>
            </p>
            <Link href="/auth/login">
              <Button fullWidth variant="secondary">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
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

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Send Reset Link
              </Button>
            </div>
          </form>
        )}

        {/* Back to login */}
        <Link href="/auth/login" className="flex items-center gap-2 text-primary-cyan hover:text-primary-cyan-light transition mt-6 justify-center">
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
