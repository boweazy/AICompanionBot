import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Heart, MessageCircle, Share, Bot as BotIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post, Comment } from "@shared/schema";

export default function SocialFeed() {
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: allComments = [] } = useQuery<Comment[]>({
    queryKey: ["/api/posts/1/comments"], // Simplified for demo
  });

  const formatTimeAgo = (date: string | Date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "unknown time";
    }
  };

  return (
    <div className="bubble-card h-full">
      <div className="p-6 border-b border-sfs-gold/30">
        <div className="text-heading text-xl text-gold-shine flex items-center">
          <Newspaper className="mr-3 h-6 w-6" />
          Live Social Feed
          <div className="ml-auto">
            <Badge className="bg-sfs-gold/20 text-gold-shine border-sfs-gold/30 animate-pulse">
              Live Simulation
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-sfs-brown-card rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6 overflow-y-auto max-h-96">
            {posts.map((post) => (
              <div key={post.id}>
                {/* Main Post */}
                <div className="bg-sfs-brown-card rounded-xl p-5 border border-sfs-gold/20 hover:border-sfs-gold/40 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={post.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"} 
                      alt={`${post.author} avatar`} 
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150";
                      }}
                    />
                    <div>
                      <h4 className="text-heading font-semibold text-gold-shine">{post.author}</h4>
                      <p className="text-xs text-gold-shine">
                        {post.createdAt ? formatTimeAgo(post.createdAt) : "just now"}
                      </p>
                    </div>
                    {post.isFromBot && (
                      <div className="ml-auto">
                        <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">Bot Created</Badge>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm mb-4 text-gold-shine leading-relaxed">{post.content}</p>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-red-400 hover:text-red-300 p-0 h-auto transition-colors">
                      <Heart className="h-5 w-5" />
                      <span>{post.likes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 p-0 h-auto transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-green-400 hover:text-green-300 p-0 h-auto transition-colors">
                      <Share className="h-5 w-5" />
                      <span>{post.shares || 0}</span>
                    </Button>
                  </div>
                </div>

                {/* Bot Comments/Interactions */}
                {allComments
                  .filter(comment => comment.postId === post.id)
                  .map((comment) => (
                    <div key={comment.id} className="bubble-section rounded-lg p-3 ml-8 mt-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-sfs-gold rounded-full flex items-center justify-center">
                          <BotIcon className="text-sfs-black text-xs" />
                        </div>
                        <span className="text-sm font-medium text-gold-shine">{comment.author}</span>
                        <Badge className="text-xs bg-blue-600 text-white">Bot Action</Badge>
                      </div>
                      <p className="text-sm text-gold-shine opacity-80">{comment.content}</p>
                    </div>
                  ))}

                {/* Simulated Bot Like Action */}
                {post.id === 2 && (
                  <div className="bubble-section rounded-lg p-3 ml-8 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-sfs-gold rounded-full flex items-center justify-center">
                        <BotIcon className="text-sfs-black text-xs" />
                      </div>
                      <span className="text-sm text-gold-shine">Content Creator Bot liked this post</span>
                      <Badge className="text-xs bg-red-600 text-white">Bot Action</Badge>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
