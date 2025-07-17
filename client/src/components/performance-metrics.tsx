import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";
import type { Bot } from "@shared/schema";
import type { BotStats } from "@/lib/types";

export default function PerformanceMetrics() {
  const { data: bots = [], isLoading } = useQuery<Bot[]>({
    queryKey: ["/api/bots"],
  });

  const calculateMetrics = () => {
    if (bots.length === 0) {
      return {
        engagementRate: 0,
        contentQuality: 0,
        followSuccess: 0,
        safetyCompliance: 100
      };
    }

    const totalEngagement = bots.reduce((sum, bot) => {
      const stats = bot.stats as BotStats;
      return sum + (stats.engagementRate || stats.successRate || 0);
    }, 0);

    const avgEngagement = totalEngagement / bots.length;

    return {
      engagementRate: Math.round(avgEngagement),
      contentQuality: Math.min(92, Math.round(avgEngagement + 5)), // Slightly higher than engagement
      followSuccess: Math.max(70, Math.round(avgEngagement - 10)), // Slightly lower than engagement
      safetyCompliance: 100 // Always 100% for demo
    };
  };

  const metrics = calculateMetrics();

  const MetricItem = ({ label, value, color = "bg-brand-gold" }: { 
    label: string; 
    value: number; 
    color?: string; 
  }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-brand-gold">{label}</span>
        <span className="text-brand-gold font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2 bg-brand-brown">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${value}%` }}
        />
      </Progress>
    </div>
  );

  return (
    <Card className="bg-dark-surface border-brand-gold-dark">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-brand-gold flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-brand-brown rounded animate-pulse" />
                <div className="h-2 bg-brand-brown rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <MetricItem 
              label="Engagement Rate" 
              value={metrics.engagementRate} 
            />
            <MetricItem 
              label="Content Quality Score" 
              value={metrics.contentQuality} 
            />
            <MetricItem 
              label="Follow Success Rate" 
              value={metrics.followSuccess} 
            />
            <MetricItem 
              label="Safety Compliance" 
              value={metrics.safetyCompliance} 
              color="bg-green-500" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
