'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Home, Trash2, Mail, Download } from 'lucide-react'

const LEADS_PER_PAGE = 10

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('analyzedLeads') || '[]')
    setLeads(savedLeads)
    setLoaded(true)
  }, [])

  const handleDelete = (id: number) => {
    const updated = leads.filter(item => item.id !== id)
    setLeads(updated)
    localStorage.setItem('analyzedLeads', JSON.stringify(updated))
  }

  const handleExportCSV = () => {
    if (leads.length === 0) return
    
    const headers = ['Website URL', 'Performance Score', 'SEO Score', 'Security Score', 'UX Score', 'Analysis Date']
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => 
        [
          `"${lead.url}"`,
          lead.performanceScore || 0,
          lead.seoScore || 0,
          lead.securityScore || 0,
          lead.uxScore || 0,
          lead.timestamp
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'leads.csv')
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleContactLead = (url: string) => {
    const subject = `Site Analysis Report for ${url}`
    const body = `I've analyzed your website and found optimization opportunities...`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const totalPages = Math.ceil(leads.length / LEADS_PER_PAGE)
  const startIdx = (currentPage - 1) * LEADS_PER_PAGE
  const displayedLeads = leads.slice(startIdx, startIdx + LEADS_PER_PAGE)

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
            <button onClick={() => router.push('/leads')} className="hover:text-foreground text-primary transition-colors cursor-pointer font-semibold">Leads</button>
            <button onClick={() => router.push('/docs')} className="hover:text-foreground transition-colors cursor-pointer">Docs</button>
            <button onClick={() => router.push('/pricing')} className="hover:text-foreground transition-colors cursor-pointer">Pricing</button>
            <button onClick={() => router.push('/contact')} className="hover:text-foreground transition-colors cursor-pointer">Contact</button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Sales Leads</h1>
              <p className="text-muted-foreground text-sm mt-2">Manage websites you&apos;ve analyzed for sales outreach</p>
            </div>
            {leads.length > 0 && (
              <Button
                onClick={handleExportCSV}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            )}
          </div>

          {/* Stats */}
          {leads.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads', value: leads.length },
                { label: 'Avg Performance', value: Math.round(leads.reduce((sum, l) => sum + (l.performanceScore || 0), 0) / leads.length) + '%' },
                { label: 'High Priority', value: leads.filter(l => (l.performanceScore || 0) < 70).length },
                { label: 'Ready to Contact', value: leads.length }
              ].map((stat, i) => (
                <Card key={i} className="bg-card/50 border border-border/30 p-4">
                  <div className="text-muted-foreground text-sm mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                </Card>
              ))}
            </div>
          )}

          {!loaded ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading leads...</div>
            </div>
          ) : leads.length === 0 ? (
            <Card className="bg-card/50 border border-border/30 p-12 text-center">
              <div className="space-y-4">
                <div className="text-4xl">🎯</div>
                <h3 className="font-semibold text-foreground text-lg">No leads yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Analyze websites to add them as leads for your sales pipeline. Each analyzed website automatically gets added here.
                </p>
                <Button onClick={() => router.push('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  Analyze Your First Website
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {displayedLeads.map((lead) => {
                  const date = new Date(lead.timestamp)
                  const formattedDate = date.toLocaleDateString()
                  const avgScore = Math.round((lead.performanceScore + lead.seoScore + lead.securityScore + lead.uxScore) / 4)
                  return (
                    <Card key={lead.id} className="bg-card/50 border border-border/30 p-6 hover:border-primary/30 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className={avgScore >= 75 ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'}>
                              Score: {avgScore}%
                            </Badge>
                            <h3 className="font-semibold text-foreground break-all text-sm">{lead.url}</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[
                              { label: 'Performance', value: lead.performanceScore },
                              { label: 'SEO', value: lead.seoScore },
                              { label: 'Security', value: lead.securityScore },
                              { label: 'UX', value: lead.uxScore }
                            ].map((metric, i) => (
                              <div key={i} className="text-sm">
                                <div className="text-muted-foreground text-xs mb-1">{metric.label}</div>
                                <div className="font-semibold text-foreground">{metric.value}%</div>
                              </div>
                            ))}
                          </div>
                          
                          <p className="text-xs text-muted-foreground">Analyzed on {formattedDate}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            onClick={() => handleContactLead(lead.url)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                            size="sm"
                          >
                            <Mail className="w-4 h-4" />
                            Contact
                          </Button>
                          <Button
                            onClick={() => handleDelete(lead.id)}
                            variant="outline"
                            className="border-border/50 text-muted-foreground hover:text-red-400"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="border-border/50"
                  >
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="border-border/50"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
