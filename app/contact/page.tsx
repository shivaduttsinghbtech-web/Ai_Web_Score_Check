'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

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
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors font-medium text-primary">Contact</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or need support? We&apos;d love to hear from you. Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <Card className="bg-card/50 border border-border/30 p-6 hover:border-primary/30 hover:bg-card/70 transition-all">
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
            <a href="mailto:shivaduttsinghbtech@gmail.com" className="text-primary hover:underline">
              shivaduttsinghbtech@gmail.com
            </a>
            <p className="text-xs text-muted-foreground mt-2">We typically reply within 24 hours</p>
          </Card>

          <Card className="bg-card/50 border border-border/30 p-6 hover:border-primary/30 hover:bg-card/70 transition-all">
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
            <a href="tel:+918840214714" className="text-primary hover:underline">
              +91 8840214714
            </a>
            <p className="text-xs text-muted-foreground mt-2">Available Monday to Friday, 9am-6pm IST</p>
          </Card>

          <Card className="bg-card/50 border border-border/30 p-6 hover:border-primary/30 hover:bg-card/70 transition-all">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
            <p className="text-muted-foreground text-sm">
              New Delhi, India
            </p>
            <p className="text-xs text-muted-foreground mt-2">Global team, local support</p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 border border-border/30 p-8 hover:border-border/60 transition-all glow-border">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 border-t-transparent"></div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Message sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98XXXXXXXX"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    rows={6}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We&apos;re here to help. Expect a response within 24 hours.
                </p>
              </form>
            )}
          </Card>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <Card className="bg-card/50 border border-border/30 p-8 hover:border-border/60 transition-all">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sales Inquiry</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Looking to scale your sales outreach? Our enterprise team can help you customize a solution.
            </p>
            <a href="mailto:shivaduttsinghbtech@gmail.com" className="text-primary text-sm font-medium hover:underline">
              Email sales team →
            </a>
          </Card>

          <Card className="bg-card/50 border border-border/30 p-8 hover:border-border/60 transition-all">
            <h3 className="text-lg font-semibold text-foreground mb-4">Developer Support</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Have technical questions about our API? Our developers are ready to help.
            </p>
            <Link href="/docs" className="text-primary text-sm font-medium hover:underline">
              View documentation →
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
