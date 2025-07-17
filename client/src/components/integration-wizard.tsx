import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Globe,
  Users,
  TrendingUp,
  Play,
  Pause,
  Plus,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle
} from "lucide-react";

interface Platform {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  connected: boolean;
  subscribers?: string;
  engagement?: string;
  botTypes: string[];
  description: string;
}

const platforms: Platform[] = [
  {
    id: "twitter",
    name: "Twitter/X",
    icon: <Twitter className="w-6 h-6" />,
    color: "bg-blue-500",
    connected: false,
    subscribers: "0",
    engagement: "0%",
    botTypes: ["Content Creator", "Engagement", "Follower"],
    description: "Automate tweets, replies, and engagement for maximum reach"
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="w-6 h-6" />,
    color: "bg-pink-500",
    connected: false,
    subscribers: "0",
    engagement: "0%",
    botTypes: ["Content Creator", "Engagement"],
    description: "Schedule posts, stories, and automate likes and comments"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    color: "bg-blue-600",
    connected: false,
    subscribers: "0",
    engagement: "0%",
    botTypes: ["Content Creator", "Engagement", "Analytics"],
    description: "Professional networking automation and content distribution"
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <Facebook className="w-6 h-6" />,
    color: "bg-blue-700",
    connected: false,
    subscribers: "0",
    engagement: "0%",
    botTypes: ["Content Creator", "Engagement"],
    description: "Automate posts, page management, and audience engagement"
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-black",
    connected: false,
    subscribers: "0",
    engagement: "0%",
    botTypes: ["Content Creator", "Engagement"],
    description: "Viral content automation and trend-based engagement"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="w-6 h-6" />,
    color: "bg-red-600",
    connected: false,
    subscribers: "0",
    engagement: "0%",
    botTypes: ["Content Creator", "Analytics"],
    description: "Video content scheduling and comment management"
  }
];

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

const wizardSteps: WizardStep[] = [
  { id: 1, title: "Select Platforms", description: "Choose social media platforms to integrate" },
  { id: 2, title: "Authentication", description: "Connect your accounts securely" },
  { id: 3, title: "Bot Configuration", description: "Configure automation settings" },
  { id: 4, title: "Deployment", description: "Deploy your bots across platforms" }
];

export default function IntegrationWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [platformConfigs, setPlatformConfigs] = useState<Record<string, any>>({});
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleNextStep = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeployment = async () => {
    setIsDeploying(true);
    setDeploymentProgress(0);
    
    // Simulate deployment process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDeploymentProgress(i);
    }
    
    setIsDeploying(false);
    setIsOpen(false);
    setCurrentStep(1);
    setSelectedPlatforms([]);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gold-shine mb-2">Select Social Media Platforms</h3>
              <p className="text-gold-shine">Choose the platforms where you want to deploy your automation bots</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`bubble-section p-4 cursor-pointer transition-all duration-200 ${
                    selectedPlatforms.includes(platform.id) 
                      ? 'border-sfs-gold shadow-lg shadow-sfs-gold/20' 
                      : 'hover:border-sfs-gold/50'
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                      {platform.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gold-shine">{platform.name}</h4>
                      <p className="text-xs text-gold-shine">{platform.description}</p>
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {platform.botTypes.map((type) => (
                      <Badge key={type} className="text-xs bg-sfs-gold/20 text-gold-shine border-sfs-gold/30">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gold-shine mb-2">Connect Your Accounts</h3>
              <p className="text-gold-shine">Securely authenticate with selected platforms</p>
            </div>
            
            <div className="space-y-4">
              {selectedPlatforms.map((platformId) => {
                const platform = platforms.find(p => p.id === platformId);
                if (!platform) return null;
                
                return (
                  <div key={platformId} className="bubble-section p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                          {platform.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gold-shine">{platform.name}</h4>
                          <p className="text-xs text-gold-shine">Click to authenticate</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gold-shine mb-2">Configure Bot Settings</h3>
              <p className="text-gold-shine">Customize automation behavior for each platform</p>
            </div>
            
            <div className="space-y-4">
              {selectedPlatforms.map((platformId) => {
                const platform = platforms.find(p => p.id === platformId);
                if (!platform) return null;
                
                return (
                  <div key={platformId} className="bubble-section p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                        {platform.icon}
                      </div>
                      <h4 className="font-semibold text-gold-shine">{platform.name}</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-gold-shine">Posting Schedule</Label>
                          <Input 
                            placeholder="e.g., Every 2 hours"
                            className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                          />
                        </div>
                        <div>
                          <Label className="text-gold-shine">Content Keywords</Label>
                          <Input 
                            placeholder="e.g., #tech, #AI, #automation"
                            className="bg-sfs-brown-card border-sfs-gold/30 text-gold-shine"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-gold-shine">Auto-like posts</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gold-shine">Auto-follow users</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gold-shine">Reply to comments</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gold-shine mb-2">Deploy Your Bots</h3>
              <p className="text-gold-shine">Ready to launch automation across {selectedPlatforms.length} platforms</p>
            </div>
            
            {isDeploying ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-gold-shine mb-2">Deploying bots...</div>
                  <Progress value={deploymentProgress} className="w-full" />
                  <div className="text-sm text-gold-shine mt-2">{deploymentProgress}% complete</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bubble-section p-4">
                  <h4 className="font-semibold text-gold-shine mb-3">Deployment Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gold-shine">Platforms:</div>
                      <div className="text-gold-shine font-semibold">{selectedPlatforms.length}</div>
                    </div>
                    <div>
                      <div className="text-gold-shine">Bot Types:</div>
                      <div className="text-gold-shine font-semibold">3</div>
                    </div>
                    <div>
                      <div className="text-gold-shine">Est. Reach:</div>
                      <div className="text-gold-shine font-semibold">10K+ users</div>
                    </div>
                    <div>
                      <div className="text-gold-shine">Monthly Cost:</div>
                      <div className="text-gold-shine font-semibold">$29/month</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleDeployment}
                  className="w-full bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Deploy Bots Now
                </Button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright" size="lg">
          <Zap className="w-4 h-4 mr-2" />
          Quick Platform Integration
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sfs-brown border-sfs-gold">
        <DialogHeader>
          <DialogTitle className="text-gold-shine flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Social Media Integration Wizard
          </DialogTitle>
          <DialogDescription className="text-gold-shine">
            Connect and deploy bots across multiple social media platforms in minutes
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {wizardSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                ${currentStep >= step.id 
                  ? 'bg-sfs-gold text-sfs-black' 
                  : 'bg-sfs-brown-card text-gold-shine border border-sfs-gold/30'
                }
              `}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <div className="ml-2 hidden md:block">
                <div className="text-sm font-medium text-gold-shine">{step.title}</div>
                <div className="text-xs text-gold-shine">{step.description}</div>
              </div>
              {index < wizardSteps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-sfs-gold' : 'bg-sfs-gold/30'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-sfs-gold/30">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
            disabled={currentStep === 1 || isDeploying}
            className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black"
          >
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isDeploying}
              className="border-sfs-gold text-gold-shine hover:bg-sfs-gold hover:text-sfs-black"
            >
              Cancel
            </Button>
            
            {currentStep < wizardSteps.length ? (
              <Button 
                onClick={handleNextStep}
                disabled={currentStep === 1 && selectedPlatforms.length === 0}
                className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright"
              >
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}