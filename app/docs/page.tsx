'use client'

import Link from 'next/link'
import { ArrowRight, Code2, Zap, Shield, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <div className="border-b border-border/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Intelligence</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors font-medium text-primary">Docs</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">Documentation</h1>
          <p className="text-lg text-muted-foreground">Everything you need to get started with Intelligence and integrate it into your workflow.</p>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Getting Started',
                description: 'Learn how to analyze your first website in under 5 minutes.',
                icon: BookOpen,
                href: '#'
              },
              {
                title: 'API Reference',
                description: 'Explore our REST API for programmatic access to analysis.',
                icon: Code2,
                href: '#'
              },
              {
                title: 'Integration Guide',
                description: 'Integrate Intelligence into your existing tools and platforms.',
                icon: Zap,
                href: '#'
              },
              {
                title: 'Security & Privacy',
                description: 'Learn about our security measures and data protection.',
                icon: Shield,
                href: '#'
              }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <Card key={i} className="bg-card/50 border border-border/30 p-6 hover:border-primary/30 hover:bg-card/70 transition-all group cursor-pointer">
                  <Icon className="w-6 h-6 text-primary mb-3 group-hover:translate-x-1 transition-transform" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">API Endpoints</h2>
          <div className="space-y-4">
            {[
              {
                method: 'POST',
                endpoint: '/api/analyze',
                description: 'Analyze a website and get comprehensive audit results'
              },
              {
                method: 'GET',
                endpoint: '/api/results/:id',
                description: 'Retrieve previous analysis results by ID'
              },
              {
                method: 'POST',
                endpoint: '/api/generate/proposal',
                description: 'Generate a sales proposal for a website'
              },
              {
                method: 'POST',
                endpoint: '/api/generate/script',
                description: 'Generate a cold outreach video script'
              }
            ].map((api, i) => (
              <Card key={i} className="bg-card/50 border border-border/30 p-6 hover:border-border/60 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded bg-primary/20 text-primary text-xs font-mono font-bold">
                        {api.method}
                      </span>
                      <code className="text-foreground font-mono text-sm">{api.endpoint}</code>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{api.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Example Usage</h2>
          <Card className="bg-card/50 border border-border/30 p-6 overflow-x-auto glow-border">
            <pre className="text-sm text-muted-foreground font-mono">
{`const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com'
  })
});

const results = await response.json();
console.log(results.audit);
console.log(results.proposal);
console.log(results.videoScript);`}
            </pre>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does an analysis take?',
                a: 'Website analysis typically takes 30-60 seconds depending on site size and complexity.'
              },
              {
                q: 'Can I export results?',
                a: 'Yes! All results can be exported as PDF, JSON, or copied to clipboard.'
              },
              {
                q: 'Is my data secure?',
                a: 'We use enterprise-grade encryption and comply with GDPR, CCPA, and SOC 2 standards.'
              },
              {
                q: 'Do you offer API access?',
                a: 'Yes, API access is available on Pro and Enterprise plans with full documentation.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-card/50 border border-border/30 p-6 hover:border-border/60 transition-all">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card/50 border border-border/30 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our support team is here to help. Get in touch with us anytime.
          </p>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
