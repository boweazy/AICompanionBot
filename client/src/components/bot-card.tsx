import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Bot } from "@shared/schema";
import type { BotStats } from "@/lib/types";

interface BotCardProps {
  bot: Bot;
}

export default function BotCard({ bot }: BotCardProps) {
  const queryClient = useQueryClient();
  const stats = bot.stats as BotStats;

  const toggleBotMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/bots/${bot.id}`, {
        isActive: !bot.isActive
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });

  const handleToggle = () => {
    toggleBotMutation.mutate();
  };

  return (
    <div className="bg-brand-brown rounded-lg p-4 border border-brand-gold-dark">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-brand-gold">{bot.name}</h4>
        <Badge 
          className={`text-xs px-2 py-1 rounded-full ${
            bot.isActive 
              ? "bg-green-600 text-white" 
              : "bg-gray-600 text-white"
          }`}
        >
          {bot.isActive ? "Active" : "Paused"}
        </Badge>
      </div>
      <p className="text-sm opacity-70 mb-3">{bot.description}</p>
      
      <div className="flex items-center justify-between text-xs mb-3">
        {bot.type === "content_creator" && (
          <>
            <span>Posts: <span className="text-brand-gold">{stats.postsCount || 0}</span></span>
            <span>Engagement: <span className="text-brand-gold">{stats.engagementRate || 0}%</span></span>
          </>
        )}
        {bot.type === "engagement" && (
          <>
            <span>Likes: <span className="text-brand-gold">{stats.likesCount || 0}</span></span>
            <span>Comments: <span className="text-brand-gold">{stats.commentsCount || 0}</span></span>
          </>
        )}
        {bot.type === "follower" && (
          <>
            <span>Follows: <span className="text-brand-gold">{stats.followsCount || 0}</span></span>
            <span>Success Rate: <span className="text-brand-gold">{stats.successRate || 0}%</span></span>
          </>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          className="text-xs bg-brand-gold text-brand-black hover:bg-brand-gold-light"
        >
          Configure
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="text-xs border-brand-gold-dark text-brand-gold hover:bg-brand-gold-dark hover:text-brand-black"
          onClick={handleToggle}
          disabled={toggleBotMutation.isPending}
        >
          {bot.isActive ? "Pause" : "Resume"}
        </Button>
      </div>
    </div>
  );
}
