import { Metadata } from 'next'
import { Suspense } from 'react'
import DashboardApp from '@/components/DashboardApp'

export const metadata: Metadata = {
  title: 'SFS AutoBots - Build AI Bots That Scale Your E-Com Empire',
  description: 'Transform your e-commerce business with AI-powered social media automation. Create smart bots that drive engagement, generate leads, and boost sales across all platforms.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* SEO-friendly static content for crawlers */}
      <div className="sr-only">
        <h1>Build AI Bots That Scale Your E-Com Empire</h1>
        <p>SFS AutoBots is the premier platform for e-commerce social media automation. Our AI-powered bots help businesses:</p>
        <ul>
          <li>Automate social media engagement across platforms</li>
          <li>Generate high-converting content automatically</li>
          <li>Optimize sales funnels with smart bot interactions</li>
          <li>Track ROI and conversion metrics in real-time</li>
          <li>Scale customer acquisition through intelligent automation</li>
        </ul>
      </div>
      
      {/* Hero Section - Visible to both crawlers and users */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build AI Bots That Scale Your{' '}
            <span className="text-yellow-400 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              E-Com Empire
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Automate social media engagement, content creation, and sales optimization 
            with AI-powered bots that work 24/7 to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-colors">
              Start Building Bots
            </button>
            <span className="text-yellow-400 font-medium">Free • No Credit Card Required</span>
          </div>
        </div>
      </section>

      {/* Features Preview for SEO */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Everything You Need to Automate E-Commerce Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-900 border border-stone-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Smart Bot Marketplace</h3>
              <p className="text-gray-300">Pre-built templates for product promotion, customer engagement, and sales automation.</p>
            </div>
            <div className="bg-stone-900 border border-stone-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Advanced Analytics</h3>
              <p className="text-gray-300">Track ROI, conversion rates, and engagement metrics across all platforms.</p>
            </div>
            <div className="bg-stone-900 border border-stone-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">AI-Powered Scheduling</h3>
              <p className="text-gray-300">Intelligent automation rules that respond to trends, engagement, and sales opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Load the interactive dashboard */}
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full" />
        </div>
      }>
        <DashboardApp />
      </Suspense>
    </main>
  )
}