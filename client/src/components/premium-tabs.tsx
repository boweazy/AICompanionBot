import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot as BotIcon, Activity, BarChart3, Settings, Crown, Zap, Globe, Store } from "lucide-react";
import BotCard from "@/components/bot-card";
import SocialFeed from "@/components/social-feed";
import ActivityFeed from "@/components/activity-feed";
import EcommerceAnalytics from "@/components/EcommerceAnalytics";
import BotConfiguration from "@/components/bot-configuration";
import SmartScheduling from "@/components/SmartScheduling";
import MarketplaceTemplates from "@/components/MarketplaceTemplates";
import PersonalityDesigner from "@/components/PersonalityDesigner";
import UpgradeModal from "@/components/upgrade-modal";
import IntegrationWizard from "@/components/integration-wizard";
import { useQuery } from "@tanstack/react-query";
import type { Bot } from "@shared/schema";

export default function PremiumTabs() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const { data: bots = [], isLoading: botsLoading } = useQuery<Bot[]>({
    queryKey: ["/api/bots"],
  });

  const activeBots = bots.filter(bot => bot.isActive);
  
  // Freemium logic - limit free users to 3 bots
  const isFreePlan = true; // This would come from user context/auth
  const maxFreeBots = 3;
  const canCreateBot = !isFreePlan || bots.length < maxFreeBots;

  return (
    <div className="w-full bubble-section p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-sfs-brown-card border border-sfs-gold/30 bubble-section">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <BotIcon className="w-4 h-4 mr-2" />
            Bot Overview
          </TabsTrigger>
          <TabsTrigger 
            value="feed" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <Activity className="w-4 h-4 mr-2" />
            Live Feed
          </TabsTrigger>
          <TabsTrigger 
            value="marketplace" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <Store className="w-4 h-4 mr-2" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="scheduling" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <Zap className="w-4 h-4 mr-2" />
            Scheduling
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <Globe className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="configure" 
            className="data-[state=active]:bg-sfs-gold data-[state=active]:text-sfs-black text-gold-shine"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-heading text-2xl text-gold-shine">Active Bots</h2>
              <p className="text-gold-shine">Manage your deployed automation bots</p>
            </div>
            <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
              {activeBots.length} Active
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {botsLoading ? (
              Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="h-48 bg-sfs-brown-card rounded-xl animate-pulse border border-sfs-gold/20" />
              ))
            ) : bots.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BotIcon className="w-16 h-16 text-sfs-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sfs-gold mb-2">No Bots Yet</h3>
                <p className="text-sfs-gray">Create your first bot to get started with automation</p>
              </div>
            ) : (
              bots.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="feed" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-heading text-2xl text-sfs-gold">Live Social Feed</h2>
              <p className="text-sfs-gray">Watch your bots interact in real-time</p>
            </div>
            <SocialFeed />
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="mt-6">
          <MarketplaceTemplates />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-heading text-2xl text-sfs-gold">Performance Analytics</h2>
                <p className="text-sfs-gray">Advanced insights and performance tracking</p>
              </div>
              {isFreePlan && (
                <Badge 
                  className="bg-sfs-gold/10 text-sfs-gold border-sfs-gold/30 cursor-pointer hover:bg-sfs-gold/20 transition-colors"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  <Crown className="w-3 h-3 mr-1" />
                  Upgrade for Advanced Analytics
                </Badge>
              )}
            </div>
            <EcommerceAnalytics />
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-heading text-2xl text-gold-shine">Smart Scheduling</h2>
                <p className="text-gold-shine">Automate bot actions with intelligent triggers and conditions</p>
              </div>
              <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Rules
              </Badge>
            </div>
            <SmartScheduling />
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-heading text-2xl text-gold-shine">Platform Integrations</h2>
                <p className="text-gold-shine">Connect your social media accounts and deploy bots across platforms</p>
              </div>
              <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30">
                <Zap className="w-3 h-3 mr-1" />
                One-Click Setup
              </Badge>
            </div>
            
            {/* Integration Wizard */}
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gold-shine mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gold-shine mb-4">
                Connect Your Social Media Platforms
              </h3>
              <p className="text-gold-shine mb-8 max-w-2xl mx-auto">
                Use our one-click integration wizard to connect Twitter, Instagram, LinkedIn, 
                Facebook, TikTok, and YouTube. Deploy smart bots across all platforms in minutes.
              </p>
              
              <IntegrationWizard />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bubble-section p-6 text-center">
                  <div className="w-12 h-12 bg-sfs-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-sfs-black" />
                  </div>
                  <h4 className="font-semibold text-gold-shine mb-2">Instant Setup</h4>
                  <p className="text-gold-shine text-sm">Connect multiple platforms in under 5 minutes</p>
                </div>
                
                <div className="bubble-section p-6 text-center">
                  <div className="w-12 h-12 bg-sfs-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-sfs-black" />
                  </div>
                  <h4 className="font-semibold text-gold-shine mb-2">Smart Configuration</h4>
                  <p className="text-gold-shine text-sm">AI-powered settings optimization for each platform</p>
                </div>
                
                <div className="bubble-section p-6 text-center">
                  <div className="w-12 h-12 bg-sfs-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-sfs-black" />
                  </div>
                  <h4 className="font-semibold text-gold-shine mb-2">Unified Analytics</h4>
                  <p className="text-gold-shine text-sm">Track performance across all platforms</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="configure" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-heading text-2xl text-gold-shine">Bot Personality Designer</h2>
                <p className="text-gold-shine">Customize your bot's personality and communication style</p>
              </div>
              {!canCreateBot && (
                <Badge 
                  className="bg-orange-500/20 text-orange-400 border-orange-500/30 cursor-pointer hover:bg-orange-500/30 transition-colors"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Limit Reached: Upgrade to Create More Bots
                </Badge>
              )}
            </div>
            <PersonalityDesigner />
          </div>
        </TabsContent>
      </Tabs>
      
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        feature={!canCreateBot ? "unlimited bots" : "advanced analytics"}
      />
    </div>
  );
}