import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Activity as ActivityType } from "@shared/schema";

export default function ActivityFeed() {
  const { data: activities = [], isLoading } = useQuery<ActivityType[]>({
    queryKey: ["/api/activities"],
    refetchInterval: 5000, // Refresh every 5 seconds for real-time feel
  });

  const formatTimeAgo = (date: string | Date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "unknown time";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "post":
        return "bg-green-500";
      case "like":
        return "bg-blue-500";
      case "comment":
        return "bg-green-500";
      case "follow":
        return "bg-purple-500";
      case "pause":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bubble-card">
      <div className="p-6 border-b border-sfs-gold/30">
        <div className="text-lg font-semibold text-gold-shine flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Recent Activity
        </div>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-sfs-brown-card rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-sm text-gold-shine text-center py-4">
                No recent activity
              </p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}></div>
                  <span className="flex-1 text-gold-shine">{activity.description}</span>
                  <span className="text-xs text-gold-shine">
                    {activity.createdAt ? formatTimeAgo(activity.createdAt) : "now"}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
