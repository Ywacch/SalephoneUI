import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SalePhone - Smart Technology Upgrade Advisor',
  description: 'Optimize your device upgrade timing to maximize value and minimize costs. Track your tech portfolio and receive intelligent recommendations.',
  keywords: 'technology, devices, upgrade, portfolio, recommendations, smart advisor',
  authors: [{ name: 'SalePhone Team' }],
  creator: 'SalePhone',
  publisher: 'SalePhone',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://salephone.app'),
  openGraph: {
    title: 'SalePhone - Smart Technology Upgrade Advisor',
    description: 'Optimize your device upgrade timing to maximize value and minimize costs.',
    url: 'https://salephone.app',
    siteName: 'SalePhone',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SalePhone - Smart Technology Upgrade Advisor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalePhone - Smart Technology Upgrade Advisor',
    description: 'Optimize your device upgrade timing to maximize value and minimize costs.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
