import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Target, Zap, Crown, Plus, ArrowRight } from "lucide-react";

const scheduleTemplates = [
  {
    id: 1,
    name: "Peak Hours Engagement",
    description: "Auto-engage when audience is most active",
    trigger: "Daily at 7PM-9PM",
    condition: "Follower activity > 80%",
    action: "Comment on trending posts",
    isActive: true,
    isPremium: false
  },
  {
    id: 2,
    name: "Viral Content Detector",
    description: "Jump on trending content in your niche",
    trigger: "Real-time",
    condition: "Engagement rate > 5% in 1 hour",
    action: "Auto-comment with relevant message",
    isActive: true,
    isPremium: true
  },
  {
    id: 3,
    name: "Sales Opportunity Alert",
    description: "Respond to purchase intent signals",
    trigger: "Real-time",
    condition: "Keywords: 'price', 'buy', 'purchase'",
    action: "Send product link + discount code",
    isActive: false,
    isPremium: true
  }
];

export default function SchedulingRules() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-ecommerce-gold">Smart Scheduling Rules</h3>
          <p className="text-muted-foreground">Automate your bot actions with intelligent triggers</p>
        </div>
        <Button className="premium-btn">
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Active Rules */}
      <div className="grid gap-4">
        {scheduleTemplates.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`ecommerce-card ${rule.isPremium ? 'border-yellow-500/50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold text-ecommerce-gold">{rule.name}</h4>
                      {rule.isPremium && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                    
                    {/* Rule Logic */}
                    <div className="bg-black/20 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400">WHEN:</span>
                        <span className="text-muted-foreground">{rule.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-orange-400" />
                        <span className="text-orange-400">IF:</span>
                        <span className="text-muted-foreground">{rule.condition}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-green-400" />
                        <span className="text-green-400">THEN:</span>
                        <span className="text-muted-foreground">{rule.action}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-4">
                    <Switch 
                      checked={rule.isActive} 
                      disabled={rule.isPremium}
                    />
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create New Rule Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="ecommerce-card border-dashed border-yellow-500/50">
          <CardHeader>
            <CardTitle className="text-ecommerce-gold flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Rule Builder
            </CardTitle>
            <CardDescription>Create custom automation rules in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Trigger */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">When</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Specific time</SelectItem>
                    <SelectItem value="engagement">High engagement</SelectItem>
                    <SelectItem value="keyword">Keyword detected</SelectItem>
                    <SelectItem value="follower">New follower</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">If</Label>
                <Input placeholder="Enter condition..." />
              </div>

              {/* Action */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Then</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comment">Auto-comment</SelectItem>
                    <SelectItem value="like">Auto-like</SelectItem>
                    <SelectItem value="follow">Auto-follow</SelectItem>
                    <SelectItem value="dm">Send DM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-muted-foreground">
                Advanced rules with AI conditions available in Premium
              </p>
              <Button className="premium-btn">
                <ArrowRight className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Premium Upgrade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="ecommerce-card border-yellow-500/50 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-ecommerce-gold flex items-center justify-center gap-2">
                <Crown className="h-5 w-5" />
                Advanced Scheduling Pro
              </h3>
              <p className="text-muted-foreground">
                Unlock AI-powered triggers, real-time responses, and advanced automation workflows
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-yellow-500" />
                <span>Smart time optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-yellow-500" />
                <span>AI-powered conditions</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Real-time triggers</span>
              </div>
            </div>

            <Button size="lg" className="premium-btn">
              Upgrade for Advanced Rules - $49/month
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}