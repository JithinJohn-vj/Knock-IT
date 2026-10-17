import type { Metadata, Viewport } from 'next'
import './globals.css'
import IconSprite from '@/components/IconSprite'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuoteProvider from '@/components/QuoteProvider'
import LangProvider from '@/components/LangProvider'
import Behaviors from '@/components/Behaviors'
import site from '@/content/site.json'

export const metadata: Metadata = {
  title: site.title,
  description: 'Knock-IT Solution & Service: IT infrastructure, networking, security and hardware in Jeddah and across Saudi Arabia.',
  // Transparent tab icons; white "iT" on dark browser themes so it stays visible.
  icons: {
    icon: [
      { url: '/images/logos/favicon.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/images/logos/favicon-dark.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/images/logos/favicon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LangProvider>
          <QuoteProvider>
            <IconSprite />
            <Header />
            {children}
            <Footer />
            <Behaviors />
          </QuoteProvider>
        </LangProvider>
      </body>
    </html>
  )
}
