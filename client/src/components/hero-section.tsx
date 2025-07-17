import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative bg-sfs-black border-b border-sfs-gold/20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-sfs-black via-sfs-brown/20 to-sfs-black" />
      
      {/* Content */}
      <div className="relative px-6 py-12 max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Badge */}
          <Badge className="bg-sfs-gold/10 text-gold-shine border-sfs-gold/30 text-sm font-medium px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Bot Learning Platform
          </Badge>
          
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-gold-shine">
              Build AI Bots That
              <span className="block text-gold-shine">Scale Your Social Presence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gold-shine max-w-3xl mx-auto leading-relaxed">
              Master social media automation with our interactive simulation platform. 
              Create, deploy, and optimize intelligent bots that drive real engagement.
            </p>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="bg-sfs-gold text-sfs-black hover:bg-sfs-gold-bright font-semibold px-8 py-4 text-lg animate-glow">
              <Zap className="w-5 h-5 mr-2" />
              Start Building Bots
            </Button>
            <Button variant="outline" size="lg" className="border-sfs-gold text-sfs-gold hover:bg-sfs-gold/10 px-8 py-4 text-lg">
              <Target className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 mt-12 border-t border-sfs-gold/20">
            <div className="bubble-section text-center p-4">
              <div className="text-3xl font-bold text-gold-shine">10,000+</div>
              <div className="text-gold-shine">Bots Deployed</div>
            </div>
            <div className="bubble-section text-center p-4">
              <div className="text-3xl font-bold text-gold-shine">95%</div>
              <div className="text-gold-shine">Success Rate</div>
            </div>
            <div className="bubble-section text-center p-4">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-gold-shine">
                <TrendingUp className="w-8 h-8" />
                300%
              </div>
              <div className="text-gold-shine">Avg. Engagement Boost</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}