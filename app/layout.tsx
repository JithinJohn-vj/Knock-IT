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
  icons: { icon: '/images/logos/logo.jpg' },
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
