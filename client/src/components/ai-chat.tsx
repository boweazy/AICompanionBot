import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, MessageCircle, Send, Sparkles, X, Minimize2, Maximize2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Create chat session
  const createSessionMutation = useMutation({
    mutationFn: () => apiRequest("/api/chat/create", { method: "POST" }),
    onSuccess: (data) => {
      setSessionId(data.sessionId);
    },
  });

  // Send message
  const sendMessageMutation = useMutation({
    mutationFn: ({ sessionId, message }: { sessionId: string; message: string }) =>
      apiRequest(`/api/chat/${sessionId}/message`, {
        method: "POST",
        body: { message },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", sessionId] });
      setInputMessage("");
    },
  });

  // Get chat session
  const { data: chatSession, isLoading } = useQuery<ChatSession>({
    queryKey: ["chat", sessionId],
    queryFn: () => apiRequest(`/api/chat/${sessionId}`),
    enabled: !!sessionId,
    refetchInterval: 2000, // Auto-refresh for real-time feel
  });

  const handleStartChat = () => {
    if (!sessionId) {
      createSessionMutation.mutate();
    }
    setIsOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !sessionId) return;

    sendMessageMutation.mutate({
      sessionId,
      message: inputMessage.trim(),
    });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatSession?.messages]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleStartChat}
          className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright shadow-lg animate-glow"
          size="lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          AI Assistant
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="h-full flex flex-col bg-sfs-brown-card border-sfs-gold/30 shadow-xl">
        <CardHeader className="p-4 border-b border-sfs-gold/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sfs-gold rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-sfs-black" />
              </div>
              <div>
                <CardTitle className="text-lg text-gold-shine">SmartFlow AI</CardTitle>
                {!isMinimized && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gold-shine hover:text-sfs-gold"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gold-shine hover:text-sfs-gold"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-4 overflow-y-auto">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-sfs-brown rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {chatSession?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-sfs-gold text-sfs-black'
                            : 'bg-sfs-brown border border-sfs-gold/30 text-gold-shine'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-sfs-black/70' : 'text-gold-shine/70'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {sendMessageMutation.isPending && (
                    <div className="flex justify-start">
                      <div className="bg-sfs-brown border border-sfs-gold/30 text-gold-shine p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gold-shine rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-gold-shine rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 bg-gold-shine rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>

            <div className="p-4 border-t border-sfs-gold/30">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about bot creation, social media automation..."
                  className="flex-1 bg-sfs-brown-card border-sfs-gold/30 text-gold-shine placeholder:text-gold-shine/50"
                  disabled={sendMessageMutation.isPending || !sessionId}
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || sendMessageMutation.isPending || !sessionId}
                  className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}