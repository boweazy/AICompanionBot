'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import PremiumTabs from './premium-tabs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

export default function DashboardApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-black">
          <PremiumTabs />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}