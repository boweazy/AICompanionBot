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
    <Card className="bg-dark-surface border-brand-gold-dark h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-brand-gold flex items-center">
          <Newspaper className="mr-2 h-5 w-5" />
          Simulated Social Feed
          <div className="ml-auto">
            <Badge className="text-xs bg-brand-gold text-brand-black">Live Simulation</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-brand-brown rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-96">
            {posts.map((post) => (
              <div key={post.id}>
                {/* Main Post */}
                <div className="bg-brand-brown rounded-lg p-4 border border-brand-gold-dark">
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
                      <h4 className="font-medium text-brand-gold">{post.author}</h4>
                      <p className="text-xs opacity-70">
                        {post.createdAt ? formatTimeAgo(post.createdAt) : "just now"}
                      </p>
                    </div>
                    {post.isFromBot && (
                      <div className="ml-auto">
                        <Badge className="text-xs bg-green-600 text-white">Bot Created</Badge>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm mb-3">{post.content}</p>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold-light p-0 h-auto">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold-light p-0 h-auto">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-brand-gold hover:text-brand-gold-light p-0 h-auto">
                      <Share className="h-4 w-4" />
                      <span>{post.shares || 0}</span>
                    </Button>
                  </div>
                </div>

                {/* Bot Comments/Interactions */}
                {allComments
                  .filter(comment => comment.postId === post.id)
                  .map((comment) => (
                    <div key={comment.id} className="bg-brand-brown-light rounded-lg p-3 border border-brand-gold ml-8 mt-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                          <BotIcon className="text-brand-black text-xs" />
                        </div>
                        <span className="text-sm font-medium text-brand-gold">{comment.author}</span>
                        <Badge className="text-xs bg-blue-600 text-white">Bot Action</Badge>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}

                {/* Simulated Bot Like Action */}
                {post.id === 2 && (
                  <div className="bg-brand-brown-light rounded-lg p-3 border border-brand-gold ml-8 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
                        <BotIcon className="text-brand-black text-xs" />
                      </div>
                      <span className="text-sm text-brand-gold">Content Creator Bot liked this post</span>
                      <Badge className="text-xs bg-red-600 text-white">Bot Action</Badge>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
