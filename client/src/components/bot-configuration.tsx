import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BotConfiguration() {
  const [botType, setBotType] = useState("content_creator");
  const [activityLevel, setActivityLevel] = useState([5]);
  const [keywords, setKeywords] = useState("automation, productivity, AI");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [respectLimits, setRespectLimits] = useState(true);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBotMutation = useMutation({
    mutationFn: async () => {
      const config = {
        activityLevel: activityLevel[0],
        keywords: keywords.split(",").map(k => k.trim()),
        schedule: { start: startTime, end: endTime },
        respectLimits
      };

      return apiRequest("POST", "/api/bots", {
        name: `${botType.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())} Bot`,
        type: botType,
        description: getDescriptionForType(botType),
        config,
        isActive: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Bot Created",
        description: "Your new bot has been successfully deployed!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create bot. Please try again.",
        variant: "destructive",
      });
    }
  });

  const getDescriptionForType = (type: string) => {
    switch (type) {
      case "content_creator":
        return "Automatically creates and posts engaging content";
      case "engagement":
        return "Likes and comments on relevant posts";
      case "follower":
        return "Follows accounts based on targeting criteria";
      case "analytics":
        return "Monitors and analyzes social media metrics";
      default:
        return "Custom bot configuration";
    }
  };

  const getActivityLevelLabel = (level: number) => {
    if (level <= 3) return "Low";
    if (level <= 7) return "Medium";
    return "High";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBotMutation.mutate();
  };

  return (
    <Card className="bg-dark-surface border-brand-gold-dark">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-brand-gold flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Bot Configuration
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="ml-2 h-4 w-4 text-brand-gold-dark cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-48 text-xs">
                Configure how your bots behave, including posting frequency, engagement rules, and targeting parameters.
              </p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-brand-gold mb-2 block">Bot Type</Label>
            <Select value={botType} onValueChange={setBotType}>
              <SelectTrigger className="w-full bg-brand-brown border-brand-gold-dark text-brand-gold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-brand-brown border-brand-gold-dark">
                <SelectItem value="content_creator">Content Creator Bot</SelectItem>
                <SelectItem value="engagement">Engagement Bot</SelectItem>
                <SelectItem value="follower">Follower Bot</SelectItem>
                <SelectItem value="analytics">Analytics Bot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-brand-gold mb-2 block">Activity Level</Label>
            <div className="flex items-center space-x-4">
              <Slider
                value={activityLevel}
                onValueChange={setActivityLevel}
                max={10}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-brand-gold min-w-[4rem]">
                {getActivityLevelLabel(activityLevel[0])}
              </span>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-brand-gold mb-2 block">Target Keywords</Label>
            <Input 
              type="text" 
              placeholder="automation, productivity, AI" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-brand-brown border-brand-gold-dark text-brand-gold placeholder:text-brand-gold/50"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-brand-gold mb-2 block">Posting Schedule</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-brand-brown border-brand-gold-dark text-brand-gold"
              />
              <Input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-brand-brown border-brand-gold-dark text-brand-gold"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="respectLimits" 
              checked={respectLimits}
              onCheckedChange={(checked) => setRespectLimits(!!checked)}
              className="border-brand-gold-dark"
            />
            <Label htmlFor="respectLimits" className="text-sm text-brand-gold">
              Respect platform limits
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-gold text-brand-black hover:bg-brand-gold-light font-medium"
            disabled={createBotMutation.isPending}
          >
            {createBotMutation.isPending ? "Deploying..." : "Deploy Bot"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
