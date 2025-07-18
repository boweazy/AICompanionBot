'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Crown, Star, Zap, ShoppingCart, MessageCircle, TrendingUp, Users, Target, Heart, Gift } from 'lucide-react'

interface BotTemplate {
  id: string
  name: string
  description: string
  category: 'free' | 'premium'
  icon: any
  features: string[]
  metrics: {
    conversion: string
    engagement: string
    roi: string
  }
  use_case: string
  price?: string
}

const templates: BotTemplate[] = [
  {
    id: 'product-promo',
    name: 'Product Promotion Bot',
    description: 'Automatically showcase your products with engaging posts, stories, and targeted responses to drive sales.',
    category: 'free',
    icon: ShoppingCart,
    features: ['Auto product posts', 'Price drop alerts', 'Customer Q&A', 'Cross-platform sync'],
    metrics: { conversion: '3.8%', engagement: '12.5%', roi: '340%' },
    use_case: 'Perfect for e-commerce stores wanting to boost product visibility and sales'
  },
  {
    id: 'customer-service',
    name: 'Customer Service Bot',
    description: 'Provide instant support, answer FAQs, and guide customers through the purchase process 24/7.',
    category: 'free',
    icon: MessageCircle,
    features: ['FAQ responses', 'Order tracking', 'Basic support', 'Escalation rules'],
    metrics: { conversion: '2.1%', engagement: '8.3%', roi: '190%' },
    use_case: 'Ideal for businesses with high customer inquiry volume'
  },
  {
    id: 'engagement-booster',
    name: 'Engagement Amplifier',
    description: 'Boost your social presence with intelligent interactions, comments, and community building.',
    category: 'free',
    icon: Heart,
    features: ['Smart comments', 'Like automation', 'Follower growth', 'Hashtag optimization'],
    metrics: { conversion: '1.9%', engagement: '18.7%', roi: '220%' },
    use_case: 'Great for brands building social media presence and community'
  },
  {
    id: 'sales-funnel',
    name: 'Advanced Sales Funnel Bot',
    description: 'Create sophisticated sales funnels with personalized messaging, upsells, and conversion optimization.',
    category: 'premium',
    icon: Target,
    features: ['Multi-step funnels', 'A/B testing', 'Personalization', 'Advanced analytics', 'Conversion tracking'],
    metrics: { conversion: '7.2%', engagement: '24.1%', roi: '580%' },
    use_case: 'Perfect for high-ticket products and complex sales processes',
    price: 'Pro Feature'
  },
  {
    id: 'influencer-outreach',
    name: 'Influencer Outreach Bot',
    description: 'Automatically find, contact, and manage relationships with relevant influencers in your niche.',
    category: 'premium',
    icon: Users,
    features: ['Influencer discovery', 'Automated outreach', 'Campaign management', 'ROI tracking', 'Contract templates'],
    metrics: { conversion: '5.4%', engagement: '31.2%', roi: '450%' },
    use_case: 'Essential for brands scaling influencer marketing campaigns',
    price: 'Pro Feature'
  },
  {
    id: 'trend-analyzer',
    name: 'Trend Analysis & Content Bot',
    description: 'Analyze trending topics and automatically create viral content that drives engagement and sales.',
    category: 'premium',
    icon: TrendingUp,
    features: ['Trend detection', 'Content generation', 'Viral optimization', 'Performance prediction', 'Multi-platform publishing'],
    metrics: { conversion: '6.8%', engagement: '42.5%', roi: '720%' },
    use_case: 'Perfect for brands wanting to capitalize on viral trends',
    price: 'Pro Feature'
  },
  {
    id: 'loyalty-program',
    name: 'Customer Loyalty Manager',
    description: 'Build and manage customer loyalty programs with automated rewards, referrals, and retention campaigns.',
    category: 'premium',
    icon: Gift,
    features: ['Points system', 'Referral tracking', 'Automated rewards', 'VIP programs', 'Retention campaigns'],
    metrics: { conversion: '8.9%', engagement: '28.3%', roi: '640%' },
    use_case: 'Ideal for increasing customer lifetime value and retention',
    price: 'Pro Feature'
  }
]

export default function MarketplaceTemplates() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'free' | 'premium'>('all')

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  )

  const handleUseTemplate = (template: BotTemplate) => {
    if (template.category === 'premium') {
      // Show upgrade modal
      console.log('Show upgrade modal for:', template.name)
    } else {
      // Navigate to bot configuration
      console.log('Create bot from template:', template.name)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Bot Marketplace</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose from our collection of proven e-commerce bot templates. Each template is optimized 
          for specific business goals and comes with real performance metrics.
        </p>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-stone-900 border-stone-700 max-w-md mx-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            All Templates
          </TabsTrigger>
          <TabsTrigger value="free" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Free
          </TabsTrigger>
          <TabsTrigger value="premium" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            <Crown className="w-4 h-4 mr-1" />
            Premium
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className={`relative bg-stone-900 border-stone-700 hover:border-yellow-400/50 transition-all duration-300 ${template.category === 'premium' ? 'ring-1 ring-yellow-400/20' : ''}`}>
                {template.category === 'premium' && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-400 text-black">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{template.name}</CardTitle>
                      {template.price && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                          {template.price}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-stone-800 rounded-lg p-2">
                      <div className="text-yellow-400 font-semibold text-sm">{template.metrics.conversion}</div>
                      <div className="text-xs text-gray-400">Conversion</div>
                    </div>
                    <div className="bg-stone-800 rounded-lg p-2">
                      <div className="text-yellow-400 font-semibold text-sm">{template.metrics.engagement}</div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div className="bg-stone-800 rounded-lg p-2">
                      <div className="text-yellow-400 font-semibold text-sm">{template.metrics.roi}</div>
                      <div className="text-xs text-gray-400">ROI</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Key Features:</h4>
                    <div className="space-y-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300">
                          <Zap className="w-3 h-3 text-yellow-400 mr-2" />
                          {feature}
                        </div>
                      ))}
                      {template.features.length > 3 && (
                        <div className="text-xs text-gray-400">
                          +{template.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Use Case */}
                  <div className="text-xs text-gray-400 bg-stone-800 rounded-lg p-3">
                    <strong className="text-yellow-400">Use Case:</strong> {template.use_case}
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleUseTemplate(template)}
                    className={`w-full ${
                      template.category === 'premium'
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                        : 'bg-stone-700 hover:bg-stone-600 text-white'
                    }`}
                  >
                    {template.category === 'premium' ? (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Use
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Use Template
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="text-center bg-stone-900 border border-stone-700 rounded-lg p-8 mt-12">
        <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Bot?</h3>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Can't find exactly what you're looking for? Our AI can help you create a custom bot 
          tailored to your specific business needs and goals.
        </p>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <Zap className="w-4 h-4 mr-2" />
          Create Custom Bot
        </Button>
      </div>
    </div>
  )
}