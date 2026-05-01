'use client'

import Link from 'next/link'
import { CheckCircle2, Zap, BarChart3, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PricingPage() {
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
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors font-medium text-primary">Pricing</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Always flexible, never locked in.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Starter */}
          <Card className="bg-card/50 border border-border/30 p-8 hover:border-border/60 hover:bg-card/70 transition-all flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Starter</h2>
              <p className="text-muted-foreground text-sm">Perfect for individuals</p>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-bold text-foreground">$29
                <span className="text-lg text-muted-foreground font-normal">/month</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-8">
              Get Started
            </Button>
            <div className="space-y-3 flex-1">
              {[
                'Up to 100 analyses/month',
                'Basic audit reports',
                'Email support',
                'Standard API access'
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Professional (Recommended) */}
          <Card className="bg-card/50 border-2 border-primary/40 p-8 relative lg:scale-105 hover:border-primary/60 transition-all flex flex-col">
            <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">Most Popular</Badge>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Professional</h2>
              <p className="text-muted-foreground text-sm">For growing teams</p>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-bold text-foreground">$99
                <span className="text-lg text-muted-foreground font-normal">/month</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-8">
              Get Started
            </Button>
            <div className="space-y-3 flex-1">
              {[
                'Unlimited analyses',
                'Advanced audit reports',
                'AI-generated proposals',
                'Video script generation',
                'Priority email support',
                'Full API access',
                'Team collaboration (up to 5 users)'
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Enterprise */}
          <Card className="bg-card/50 border border-border/30 p-8 hover:border-border/60 hover:bg-card/70 transition-all flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Enterprise</h2>
              <p className="text-muted-foreground text-sm">Custom solutions</p>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-bold text-foreground">Custom
                <span className="text-lg text-muted-foreground font-normal block">/pricing</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-border/50 text-foreground hover:bg-secondary mb-8">
              Contact Sales
            </Button>
            <div className="space-y-3 flex-1">
              {[
                'Everything in Professional',
                'Unlimited team members',
                'Dedicated account manager',
                'Custom integrations',
                'SLA guarantee',
                'Advanced security features',
                'On-premise deployment'
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Feature Comparison</h2>
          <Card className="bg-card/50 border border-border/30 overflow-x-auto">
            <div className="p-6 min-w-full">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">Starter</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">Professional</th>
                    <th className="text-center py-3 px-4 text-muted-foreground font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Monthly analyses', starter: '100', pro: 'Unlimited', ent: 'Unlimited' },
                    { feature: 'Basic audits', starter: '✓', pro: '✓', ent: '✓' },
                    { feature: 'Advanced analytics', starter: '—', pro: '✓', ent: '✓' },
                    { feature: 'Proposal generation', starter: '—', pro: '✓', ent: '✓' },
                    { feature: 'Video scripts', starter: '—', pro: '✓', ent: '✓' },
                    { feature: 'API access', starter: 'Basic', pro: 'Full', ent: 'Full' },
                    { feature: 'Team members', starter: '1', pro: '5', ent: 'Unlimited' },
                    { feature: 'Support', starter: 'Email', pro: 'Priority', ent: 'Dedicated' }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-background/50">
                      <td className="py-4 px-4 text-foreground">{row.feature}</td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{row.starter}</td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{row.pro}</td>
                      <td className="text-center py-4 px-4 text-muted-foreground">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes! You can upgrade or downgrade at any time. Changes take effect immediately.'
              },
              {
                q: 'What happens if I exceed my limit?',
                a: 'We&apos;ll notify you before you exceed your monthly limit. You can easily upgrade or purchase additional analyses.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, you get 5 free analyses to try our platform. No credit card required.'
              },
              {
                q: 'Do you offer annual billing discounts?',
                a: 'Yes! Pay annually and save 20% on any plan.'
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
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join hundreds of companies using Intelligence to accelerate their sales process.
          </p>
          <Link href="/docs">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
