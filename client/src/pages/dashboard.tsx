import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import HeroSection from "@/components/hero-section";
import PremiumTabs from "@/components/premium-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Crown } from "lucide-react";
import type { DashboardStats } from "@/lib/types";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#2D1B0F' }}>
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Header */}
        <header className="bg-sfs-brown border-b border-sfs-gold/30 p-6">
          <div className="bubble-section">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-display text-2xl text-gold-shine">Dashboard</h2>
                  <p className="text-gold-shine mt-1">Master social media automation with intelligent bots</p>
                </div>
                <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright font-semibold transition-all duration-200">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Bot
                </Button>
                <div className="relative">
                  <Bell className="h-6 w-6 text-gold-shine cursor-pointer hover:text-sfs-gold-bright transition-colors" />
                  <Badge className="absolute -top-2 -right-2 bg-sfs-gold text-sfs-black text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center animate-pulse">
                    3
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Quick Stats Bar */}
          <div className="bg-sfs-surface-elevated border-b border-sfs-gold/10 p-6">
            <div className="max-w-6xl mx-auto">
              {statsLoading ? (
                <div className="grid grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-sfs-brown-card rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bubble-card">
                    <div className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gold-shine">{stats?.totalInteractions || 0}</div>
                        <div className="text-sm text-gold-shine">Total Interactions</div>
                      </div>
                    </div>
                  </div>
                  <div className="bubble-card">
                    <div className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gold-shine">{stats?.successRate || "0%"}</div>
                        <div className="text-sm text-gold-shine">Success Rate</div>
                      </div>
                    </div>
                  </div>
                  <div className="bubble-card">
                    <div className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gold-shine">{stats?.activeHours || "0h"}</div>
                        <div className="text-sm text-gold-shine">Active Hours</div>
                      </div>
                    </div>
                  </div>
                  <div className="bubble-card">
                    <div className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gold-shine">{stats?.costSavings || "$0"}</div>
                        <div className="text-sm text-gold-shine">Cost Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content with Premium Tabs */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              <PremiumTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
