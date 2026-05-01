'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Home, Trash2, ArrowRight } from 'lucide-react'

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('analyzeHistory') || '[]')
    setHistory(savedHistory)
    setLoaded(true)
  }, [])

  const handleDelete = (id: number) => {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    localStorage.setItem('analyzeHistory', JSON.stringify(updated))
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      setHistory([])
      localStorage.setItem('analyzeHistory', JSON.stringify([]))
    }
  }

  const handleAnalyzeAgain = (url: string) => {
    router.push('/')
    setTimeout(() => {
      const input = document.querySelector('input[type="url"]') as HTMLInputElement
      if (input) {
        input.value = url
        input.focus()
      }
    }, 100)
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
            <button onClick={() => router.push('/history')} className="hover:text-foreground text-primary transition-colors cursor-pointer font-semibold">History</button>
            <button onClick={() => router.push('/leads')} className="hover:text-foreground transition-colors cursor-pointer">Leads</button>
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
              <h1 className="text-4xl font-bold text-foreground">Analysis History</h1>
              <p className="text-muted-foreground text-sm mt-2">View all your previously analyzed websites</p>
            </div>
            {history.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="border-border/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {!loaded ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading history...</div>
            </div>
          ) : history.length === 0 ? (
            <Card className="bg-card/50 border border-border/30 p-12 text-center">
              <div className="space-y-4">
                <div className="text-4xl">📋</div>
                <h3 className="font-semibold text-foreground text-lg">No analysis history yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start analyzing websites to build up your history. Each analysis will be saved here for quick access.
                </p>
                <Button onClick={() => router.push('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  Analyze Your First Website
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {(() => {
                const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE)
                const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
                const displayedItems = history.slice(startIdx, startIdx + ITEMS_PER_PAGE)
                
                return (
                  <>
                    <div className="grid gap-4">
                      {displayedItems.map((item, index) => {
                        const date = new Date(item.timestamp)
                        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
                        return (
                          <Card key={item.id} className="bg-card/50 border border-border/30 p-6 hover:border-primary/30 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="secondary" className="bg-primary/20 text-primary flex-shrink-0">
                                    #{history.length - (startIdx + index)}
                                  </Badge>
                                  <h3 className="font-semibold text-foreground break-all text-sm">{item.url}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                              </div>
                              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                <Button
                                  onClick={() => handleAnalyzeAgain(item.url)}
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                                  size="sm"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                  Analyze
                                </Button>
                                <Button
                                  onClick={() => handleDelete(item.id)}
                                  variant="outline"
                                  className="border-border/50 text-muted-foreground hover:text-red-400 hover:border-red-500/30"
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
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
