import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Zap, Target, TrendingUp, Users, Crown } from "lucide-react";

const marketplaceTemplates = [
  {
    id: 1,
    name: "TikTok Sales Accelerator",
    description: "AI-powered bot that automatically engages with trending content in your niche to drive sales",
    category: "E-commerce",
    price: "Free",
    isPremium: false,
    rating: 4.9,
    downloads: 15432,
    tags: ["TikTok", "Sales", "Engagement"],
    features: ["Auto-commenting", "Trend detection", "Lead generation"]
  },
  {
    id: 2,
    name: "Instagram Shopping Assistant",
    description: "Automatically responds to product inquiries and guides users through the purchase process",
    category: "Customer Support",
    price: "$29/mo",
    isPremium: true,
    rating: 4.8,
    downloads: 8234,
    tags: ["Instagram", "Shopping", "Support"],
    features: ["Smart replies", "Product catalog", "Payment integration"]
  },
  {
    id: 3,
    name: "Multi-Platform Growth Engine",
    description: "Cross-platform bot that coordinates content strategy across TikTok, Instagram, and Twitter",
    category: "Growth",
    price: "$49/mo",
    isPremium: true,
    rating: 4.7,
    downloads: 12156,
    tags: ["Multi-platform", "Growth", "Strategy"],
    features: ["Cross-posting", "Analytics sync", "Audience insights"]
  },
  {
    id: 4,
    name: "Influencer Outreach Bot",
    description: "Finds and automatically contacts relevant influencers for collaboration opportunities",
    category: "Marketing",
    price: "Free",
    isPremium: false,
    rating: 4.6,
    downloads: 6789,
    tags: ["Influencer", "Outreach", "Collaboration"],
    features: ["Influencer discovery", "Auto-DM", "Performance tracking"]
  }
];

const categories = ["All", "E-commerce", "Customer Support", "Growth", "Marketing"];

export default function Marketplace() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-ecommerce-gold">
          Bot Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover pre-built e-commerce automation templates to supercharge your social media growth
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "default" : "outline"}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* Featured Templates Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {marketplaceTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="ecommerce-card h-full hover:shadow-xl transition-all duration-300">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-ecommerce-gold flex items-center gap-2">
                      {template.name}
                      {template.isPremium && (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {template.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={template.isPremium ? "default" : "secondary"}
                    className={template.isPremium ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" : ""}
                  >
                    {template.price}
                  </Badge>
                </div>

                {/* Rating and Downloads */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{template.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features List */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-ecommerce-gold">Key Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {template.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1 premium-btn"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {template.isPremium ? "Get Premium" : "Install Free"}
                  </Button>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Premium Upgrade Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <Card className="ecommerce-card border-yellow-500/50 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-ecommerce-gold flex items-center justify-center gap-2">
                <Crown className="h-6 w-6" />
                Unlock Premium Templates
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access advanced e-commerce automation templates with premium features, priority support, and unlimited usage
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-yellow-500" />
                <span>Advanced targeting algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
                <span>Real-time analytics & insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Priority customer support</span>
              </div>
            </div>

            <Button 
              size="lg"
              className="premium-btn text-lg px-8 py-3"
            >
              Upgrade to Premium - $49/month
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}