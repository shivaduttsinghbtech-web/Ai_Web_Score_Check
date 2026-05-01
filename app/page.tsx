'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, CheckCircle2, AlertCircle, Home } from 'lucide-react'
import dynamic from 'next/dynamic'

const HomeChart = dynamic(() => import('@/components/HomeChart'), {
  ssr: false,
})
export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showGraphics, setShowGraphics] = useState(false)

  const handleAnalyze = async () => {
    if (url.trim()) {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setLoading(false)
      setAnalyzed(true)
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('analyzeHistory') || '[]')
      const newAnalysis = { url, timestamp: new Date().toISOString(), id: Date.now() }
      history.unshift(newAnalysis)
      localStorage.setItem('analyzeHistory', JSON.stringify(history.slice(0, 20)))
      
      // Save to leads
      const leads = JSON.parse(localStorage.getItem('analyzedLeads') || '[]')
      const newLead = {
        url,
        timestamp: new Date().toISOString(),
        id: Date.now(),
        performanceScore: 72,
        seoScore: 85,
        securityScore: 62,
        uxScore: 78
      }
      leads.unshift(newLead)
      localStorage.setItem('analyzedLeads', JSON.stringify(leads.slice(0, 50)))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <div className="border-b border-border/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Intelligence</span>
          </button>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer" title="Home">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button onClick={() => router.push('/history')} className="hover:text-foreground transition-colors cursor-pointer">History</button>
            <button onClick={() => router.push('/leads')} className="hover:text-foreground transition-colors cursor-pointer">Leads</button>
            <button onClick={() => router.push('/docs')} className="hover:text-foreground transition-colors cursor-pointer">Docs</button>
            <button onClick={() => router.push('/pricing')} className="hover:text-foreground transition-colors cursor-pointer">Pricing</button>
            <button onClick={() => router.push('/contact')} className="hover:text-foreground transition-colors cursor-pointer">Contact</button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {!analyzed ? (
          // Input Section
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                Analyze Your Website
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get instant insights, weaknesses analysis, and AI-generated sales proposals for your website.
              </p>
            </div>

            {/* Input Card with Glow */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Card className="relative bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="p-6 space-y-4">
                    <label className="block text-sm font-medium text-foreground">
                      Website URL
                    </label>
                    <div className="flex gap-3">
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-1 focus:border-primary/50 focus:ring-primary/30"
                      />
                      <Button
                        onClick={handleAnalyze}
                        disabled={!url.trim() || loading}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 gap-2 transition-all duration-200"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <>
                            Analyze
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Analysis takes about 30 seconds. We&apos;ll scan for performance, SEO, security, and UX issues.
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: '🔍', title: 'Comprehensive Audit', desc: 'Identify technical and design issues' },
                { icon: '✍️', title: 'Sales Proposal', desc: 'AI-generated outreach content' },
                { icon: '🎬', title: 'Video Script', desc: 'Cold email video script ready' }
              ].map((feature, i) => (
                <Card key={i} className="bg-card/30 backdrop-blur border border-border/30 p-6 text-center hover:bg-card/50 hover:border-border/50 transition-all">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Results Dashboard
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Analysis Results</h2>
                <p className="text-muted-foreground text-sm mt-1">{url}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => { setAnalyzed(false); setUrl(''); }}
                className="border-border/50 text-foreground hover:bg-secondary"
              >
                New Analysis
              </Button>
            </div>

            <Tabs defaultValue="audit" className="space-y-6">
              <TabsList className="bg-card border border-border/30 p-1">
                <TabsTrigger value="audit" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Site Audit & Weaknesses
                </TabsTrigger>
                <TabsTrigger value="proposal" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Generated Proposal
                </TabsTrigger>
                <TabsTrigger value="script" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Cold Outreach Video Script
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Site Audit */}
              <TabsContent value="audit" className="space-y-6">
                {/* Graphical Overview */}
                <Card className="bg-card/50 border border-border/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Audit Score Overview</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGraphics(!showGraphics)}
                      className="border-border/50 text-foreground hover:bg-secondary text-xs"
                    >
                      {showGraphics ? 'Hide Charts' : 'Show Charts'}
                    </Button>
                  </div>
                  
                  {showGraphics && (
                    <div className="bg-background/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-4">Category Scores</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={[
                          { name: 'Performance', value: 72 },
                          { name: 'SEO', value: 85 },
                          { name: 'Security', value: 62 },
                          { name: 'UX', value: 78 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                          <YAxis stroke="rgba(255,255,255,0.5)" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(99,102,241,0.3)' }}
                            cursor={{ fill: 'rgba(99,102,241,0.1)' }}
                          />
                          <Bar dataKey="value" fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </Card>

                {/* Detailed Audit Cards */}
                <div className="grid gap-4">
                  {[
                    { title: 'Performance', score: 72, status: 'warning', issues: ['Slow TTFB', 'Large images not optimized', 'Missing cache headers'] },
                    { title: 'SEO', score: 85, status: 'good', issues: ['Good meta tags', 'Structured data present', 'Mobile friendly'] },
                    { title: 'Security', score: 62, status: 'warning', issues: ['No HSTS header', 'Outdated dependencies', 'XSS vulnerabilities'] },
                    { title: 'User Experience', score: 78, status: 'warning', issues: ['CLS score needs improvement', 'Forms lack validation feedback', 'Mobile navigation unclear'] }
                  ].map((audit, i) => (
                    <Card key={i} className="bg-card/50 border border-border/30 p-6 hover:border-border/60 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{audit.title}</h3>
                            <Badge variant={audit.status === 'good' ? 'default' : 'secondary'} className={audit.status === 'good' ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'}>
                              {audit.score}%
                            </Badge>
                          </div>
                        </div>
                        {audit.status === 'good' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                      <div className="space-y-2">
                        {audit.issues.map((issue, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 2: Proposal */}
              <TabsContent value="proposal" className="space-y-4">
                <Card className="bg-card/50 border border-border/30 p-8 glow-border">
                  <div className="prose prose-invert max-w-none text-foreground">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Subject: Boost {url} Traffic by 150% – Free Site Performance Audit
                    </p>
                    <p className="leading-relaxed mb-4">
                      Hi there,
                    </p>
                    <p className="leading-relaxed mb-4">
                      I analyzed your website and found some quick wins that could improve your conversion rate. Your current site is losing potential customers due to performance issues and missing optimization opportunities.
                    </p>
                    <p className="leading-relaxed mb-4">
                      Our analysis showed:
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">→</span>
                        <span>Page load times averaging 3.2 seconds (aim for under 2s)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">→</span>
                        <span>Mobile conversion rate 40% lower than industry standard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">→</span>
                        <span>Missing critical SEO optimization opportunities</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed mb-4">
                      I&apos;d love to show you how we&apos;ve helped 200+ companies increase their online revenue. Would you be open to a 15-minute call to discuss what we found?
                    </p>
                    <p className="leading-relaxed">
                      Best regards,
                      <br />
                      [Your Name]
                    </p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Copy Text
                    </Button>
                    <Button variant="outline" className="border-border/50">
                      Download as PDF
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              {/* Tab 3: Video Script */}
              <TabsContent value="script" className="space-y-4">
                <Card className="bg-card/50 border border-border/30 p-8 glow-border">
                  <div className="space-y-6 text-foreground">
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Duration: 45 seconds</h3>
                      <p className="text-sm text-muted-foreground mb-4">Perfect for LinkedIn video messages or cold email follow-ups</p>
                    </div>
                    
                    {[
                      { time: '0-5s', title: 'Hook', content: 'I analyzed your website and noticed your load time is costing you sales.' },
                      { time: '5-20s', title: 'Problem', content: 'Most sites like yours lose 30% of visitors due to slow pages. Your current setup is hitting users with a 3+ second load time.' },
                      { time: '20-35s', title: 'Solution', content: 'We help companies cut load times in half, which typically results in 25% more conversions. No technical work required on your end.' },
                      { time: '35-45s', title: 'CTA', content: 'Want to see how we could improve your site? I&apos;ve got a 15-minute slot this week.' }
                    ].map((section, i) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">{section.time}</span>
                          <span className="font-semibold text-primary">{section.title}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Generate Video
                    </Button>
                    <Button variant="outline" className="border-border/50">
                      Copy Script
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
