'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (session) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark to-primary-dark opacity-90" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-teal/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-cyan to-primary-teal rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-dark" />
            </div>
            <span className="text-xl font-bold gradient-text-cyan">QuantamKube AI</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-slideInRight">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text-cyan">Kubernetes Manifests</span>
              <br />
              <span className="text-white">in Seconds</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              The fastest and most powerful AI co-pilot for Kubernetes. Generate production-ready manifests, Docker files, and CI/CD configs powered by Gemini.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2">
                  Start Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://github.com/devopscl0ud/Quantamkube.ai" target="_blank">
                <Button size="lg" variant="secondary">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                description: 'Generate complete Kubernetes manifests in seconds with AI',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Production Ready',
                description: 'Security, scaling, and monitoring built-in by default',
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'AI Powered',
                description: 'Multi-turn conversations with context-aware responses',
              },
            ].map((feature, idx) => (
              <div key={idx} className="card hover:scale-105 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-cyan/20 to-primary-teal/20 flex items-center justify-center mb-4 text-primary-cyan group-hover:shadow-glow transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="mt-20 glass p-10 rounded-2xl">
            <h2 className="text-3xl font-bold gradient-text-cyan mb-8">What You Can Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Generate Kubernetes Deployments, Services, Ingress',
                'Create Dockerfiles and docker-compose files',
                'Generate GitHub Actions workflows',
                'Build ArgoCD applications',
                'Convert between formats (Helm → YAML)',
                'Explain Kubernetes errors and solutions',
                'Make configurations production-ready',
                'Add Prometheus metrics & observability',
              ].map((cap, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-cyan to-primary-teal flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary-dark" />
                  </div>
                  <span className="text-white/80">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <p className="text-white/60 mb-6">Ready to revolutionize your Kubernetes workflow?</p>
            <Link href="/auth/signup">
              <Button size="lg">
                Sign Up Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/10 py-8 px-6">
          <div className="max-w-6xl mx-auto text-center text-white/50 text-sm">
            <p>© 2025 QuantamKube AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
