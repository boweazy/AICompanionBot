import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SFS AutoBots - No-Code AI Social Automation for E-Commerce',
  description: 'Build AI bots that scale your e-commerce empire. Automate social media engagement, content creation, and sales optimization across all platforms with SFS AutoBots.',
  keywords: 'AI bots, social media automation, e-commerce, content creation, social engagement, sales automation',
  authors: [{ name: 'SFS AutoBots' }],
  openGraph: {
    title: 'SFS AutoBots - E-Commerce Social Media Automation',
    description: 'Automate e-commerce growth with AI bots for social media engagement, content creation, and sales optimization.',
    url: 'https://sfs-autobots.replit.app',
    siteName: 'SFS AutoBots',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SFS AutoBots - AI Social Media Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SFS AutoBots - E-Commerce Social Media Automation',
    description: 'AI-powered social media bots for e-commerce growth and automation.',
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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://sfs-autobots.replit.app" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FFD700', color: '#000' }}>
            <h1>SFS AutoBots - AI Social Media Automation</h1>
            <p>Build AI bots that scale your e-commerce empire. Enable JavaScript for the full experience.</p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}