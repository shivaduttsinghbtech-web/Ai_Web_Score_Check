import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono, Inter } from "next/font/google"
import "./globals.css"

const geistMono = GeistMono({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Site Intelligence Dashboard",
  description: "Analyze your website and generate sales proposals instantly",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>{children}</body>
    </html>
  )
}
