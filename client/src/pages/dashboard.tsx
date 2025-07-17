import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import BotCard from "@/components/bot-card";
import SocialFeed from "@/components/social-feed";
import BotConfiguration from "@/components/bot-configuration";
import ActivityFeed from "@/components/activity-feed";
import PerformanceMetrics from "@/components/performance-metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot as BotIcon, Plus, Bell } from "lucide-react";
import type { Bot } from "@shared/schema";
import type { DashboardStats } from "@/lib/types";

export default function Dashboard() {
  const { data: bots = [], isLoading: botsLoading } = useQuery<Bot[]>({
    queryKey: ["/api/bots"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  return (
    <div className="flex h-screen overflow-hidden bg-brand-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-brand-brown border-b border-brand-gold-dark p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-gold">Bot Learning Dashboard</h2>
              <p className="text-brand-gold opacity-70 mt-1">Learn how bots work through interactive simulation</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-brand-gold text-brand-black hover:bg-brand-gold-light font-medium">
                <Plus className="mr-2 h-4 w-4" />
                Create New Bot
              </Button>
              <div className="relative">
                <Bell className="h-6 w-6 text-brand-gold cursor-pointer hover:text-brand-gold-light" />
                <Badge className="absolute -top-2 -right-2 bg-brand-gold-light text-brand-black text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column: Bot Management */}
            <div className="lg:col-span-1 space-y-6">
              {/* Active Bots */}
              <Card className="bg-dark-surface border-brand-gold-dark">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-brand-gold flex items-center">
                    <BotIcon className="mr-2 h-5 w-5" />
                    Active Bots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {botsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-brand-brown rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bots.map((bot) => (
                        <BotCard key={bot.id} bot={bot} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-dark-surface border-brand-gold-dark">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-brand-gold">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-6 bg-brand-brown rounded animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Interactions</span>
                        <span className="text-brand-gold font-medium">{stats?.totalInteractions || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Success Rate</span>
                        <span className="text-brand-gold font-medium">{stats?.successRate || "0%"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Hours</span>
                        <span className="text-brand-gold font-medium">{stats?.activeHours || "0h"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cost Savings</span>
                        <span className="text-brand-gold font-medium">{stats?.costSavings || "$0"}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Center Column: Social Feed Simulation */}
            <div className="lg:col-span-1">
              <SocialFeed />
            </div>

            {/* Right Column: Bot Configuration & Analytics */}
            <div className="lg:col-span-1 space-y-6">
              <BotConfiguration />
              <ActivityFeed />
              <PerformanceMetrics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
