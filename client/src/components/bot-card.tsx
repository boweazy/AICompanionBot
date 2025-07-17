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
    <div className="bubble-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-sfs-gold/20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-heading font-semibold text-gold-shine">{bot.name}</h4>
        <Badge 
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            bot.isActive 
              ? "bg-green-500/20 text-green-400 border-green-500/30" 
              : "bg-sfs-gray/20 text-gold-shine opacity-60 border-sfs-gray/30"
          }`}
        >
          {bot.isActive ? "Active" : "Paused"}
        </Badge>
      </div>
      <p className="text-sm text-gold-shine mb-4 leading-relaxed">{bot.description}</p>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        {bot.type === "content_creator" && (
          <>
            <div className="text-center">
              <div className="text-xl font-bold text-gold-shine">{stats.postsCount || 0}</div>
              <div className="text-xs text-gold-shine">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gold-shine">{stats.engagementRate || 0}%</div>
              <div className="text-xs text-gold-shine">Engagement</div>
            </div>
          </>
        )}
        {bot.type === "engagement" && (
          <>
            <div className="text-center">
              <div className="text-xl font-bold text-gold-shine">{stats.likesCount || 0}</div>
              <div className="text-xs text-gold-shine">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gold-shine">{stats.commentsCount || 0}</div>
              <div className="text-xs text-gold-shine">Comments</div>
            </div>
          </>
        )}
        {bot.type === "follower" && (
          <>
            <div className="text-center">
              <div className="text-xl font-bold text-sfs-gold">{stats.followsCount || 0}</div>
              <div className="text-xs text-sfs-gray">Follows</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-sfs-gold">{stats.successRate || 0}%</div>
              <div className="text-xs text-sfs-gray">Success Rate</div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button 
          size="sm" 
          className="flex-1 bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright font-medium transition-all duration-200"
        >
          Configure
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 border-sfs-gold/50 text-sfs-gold hover:bg-sfs-gold hover:text-sfs-black transition-all duration-200"
          onClick={handleToggle}
          disabled={toggleBotMutation.isPending}
        >
          {toggleBotMutation.isPending ? "..." : (bot.isActive ? "Pause" : "Resume")}
        </Button>
      </div>
    </div>
  );
}
