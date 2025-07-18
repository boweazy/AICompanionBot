'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Clock, Zap, Target, TrendingUp, Calendar, Settings, Plus, Edit, Trash2 } from 'lucide-react'

interface AutomationRule {
  id: string
  name: string
  trigger: string
  condition: string
  action: string
  status: 'active' | 'paused'
  performance: {
    triggered: number
    successful: number
    revenue: number
  }
}

const existingRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Peak Hour Product Push',
    trigger: 'Time-based',
    condition: 'Weekdays 6-8 PM',
    action: 'Post product carousel',
    status: 'active',
    performance: { triggered: 45, successful: 38, revenue: 2340 }
  },
  {
    id: '2',
    name: 'Trending Topic Response',
    trigger: 'Hashtag trending',
    condition: '#BlackFriday OR #Sale trending',
    action: 'Reply with promo code',
    status: 'active',
    performance: { triggered: 12, successful: 9, revenue: 890 }
  },
  {
    id: '3',
    name: 'Cart Abandonment Follow-up',
    trigger: 'Engagement drop',
    condition: 'User viewed product, no purchase 24h',
    action: 'Send discount DM',
    status: 'paused',
    performance: { triggered: 23, successful: 15, revenue: 1250 }
  }
]

export default function SmartScheduling() {
  const [rules, setRules] = useState<AutomationRule[]>(existingRules)
  const [showCreateRule, setShowCreateRule] = useState(false)

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Smart Scheduling & Automation</h2>
          <p className="text-gray-400">Create intelligent rules that automatically respond to opportunities</p>
        </div>
        <Button 
          onClick={() => setShowCreateRule(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </Button>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-stone-900 border-stone-700">
          <TabsTrigger value="rules" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Automation Rules
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Content Calendar
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          {/* Quick Setup Templates */}
          <Card className="bg-stone-900 border-stone-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Quick Setup Templates
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get started with proven automation templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
                  <div className="flex items-center mb-3">
                    <Target className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-semibold text-white">Peak Hour Targeting</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Auto-post when your audience is most active
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>

                <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-semibold text-white">Trend Responder</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Automatically engage with trending topics
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>

                <div className="bg-stone-800 rounded-lg p-4 border border-stone-700">
                  <div className="flex items-center mb-3">
                    <Clock className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-semibold text-white">Sales Triggers</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    React to purchase signals automatically
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Existing Rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Active Automation Rules</h3>
            {rules.map((rule) => (
              <Card key={rule.id} className="bg-stone-900 border-stone-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${rule.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                      <h4 className="font-semibold text-white">{rule.name}</h4>
                      <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                        {rule.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={rule.status === 'active'}
                        onCheckedChange={() => toggleRuleStatus(rule.id)}
                      />
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label className="text-yellow-400 text-sm">Trigger</Label>
                      <p className="text-white text-sm">{rule.trigger}</p>
                    </div>
                    <div>
                      <Label className="text-yellow-400 text-sm">Condition</Label>
                      <p className="text-white text-sm">{rule.condition}</p>
                    </div>
                    <div>
                      <Label className="text-yellow-400 text-sm">Action</Label>
                      <p className="text-white text-sm">{rule.action}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-700">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{rule.performance.triggered}</div>
                      <div className="text-xs text-gray-400">Times Triggered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">{rule.performance.successful}</div>
                      <div className="text-xs text-gray-400">Successful Actions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-400">${rule.performance.revenue}</div>
                      <div className="text-xs text-gray-400">Revenue Generated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="bg-stone-900 border-stone-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                Content Calendar
              </CardTitle>
              <CardDescription className="text-gray-400">
                Schedule your bot activities across the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Smart Calendar Coming Soon
                </h3>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Visual calendar interface for scheduling bot activities, content posting, 
                  and automation rules across all your connected platforms.
                </p>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  Get Early Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-stone-900 border-stone-700">
            <CardHeader>
              <CardTitle className="text-white">Automation Performance</CardTitle>
              <CardDescription className="text-gray-400">
                Track the effectiveness of your automation rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-stone-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">80</div>
                  <div className="text-sm text-gray-400">Total Rules</div>
                </div>
                <div className="bg-stone-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">94%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div className="bg-stone-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">$4.8K</div>
                  <div className="text-sm text-gray-400">Revenue This Month</div>
                </div>
                <div className="bg-stone-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">2.4h</div>
                  <div className="text-sm text-gray-400">Time Saved Daily</div>
                </div>
              </div>

              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  Detailed Analytics Dashboard
                </h4>
                <p className="text-gray-400 mb-4">
                  Advanced charts and insights for automation performance coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}