'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowUp, ArrowDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const salesData = [
  { month: 'Jan', revenue: 4200, orders: 42, avgOrder: 100 },
  { month: 'Feb', revenue: 5800, orders: 58, avgOrder: 100 },
  { month: 'Mar', revenue: 7200, orders: 65, avgOrder: 110 },
  { month: 'Apr', revenue: 8900, orders: 78, avgOrder: 114 },
  { month: 'May', revenue: 12400, orders: 95, avgOrder: 130 },
  { month: 'Jun', revenue: 15600, orders: 112, avgOrder: 139 },
]

const platformData = [
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'Facebook', value: 28, color: '#1877F2' },
  { name: 'TikTok', value: 22, color: '#000000' },
  { name: 'Twitter', value: 15, color: '#1DA1F2' },
]

const conversionData = [
  { bot: 'Product Promo Bot', impressions: 12500, clicks: 850, conversions: 127, revenue: 3175 },
  { bot: 'Engagement Bot', impressions: 8200, clicks: 490, conversions: 73, revenue: 2190 },
  { bot: 'Customer Service Bot', impressions: 5600, clicks: 380, conversions: 89, revenue: 2670 },
  { bot: 'Cross-sell Bot', impressions: 4100, clicks: 285, conversions: 56, revenue: 1680 },
]

export default function EcommerceAnalytics() {
  return (
    <div className="space-y-6">
      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-stone-900 border-stone-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$54,100</div>
            <div className="flex items-center text-xs text-green-400">
              <ArrowUp className="h-3 w-3 mr-1" />
              +24.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900 border-stone-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Orders Generated</CardTitle>
            <ShoppingCart className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">450</div>
            <div className="flex items-center text-xs text-green-400">
              <ArrowUp className="h-3 w-3 mr-1" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900 border-stone-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.8%</div>
            <div className="flex items-center text-xs text-green-400">
              <ArrowUp className="h-3 w-3 mr-1" />
              +0.7% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900 border-stone-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Customer Acquisition</CardTitle>
            <Users className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">342</div>
            <div className="flex items-center text-xs text-green-400">
              <ArrowUp className="h-3 w-3 mr-1" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-stone-900 border-stone-700">
          <TabsTrigger value="revenue" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Revenue Analytics
          </TabsTrigger>
          <TabsTrigger value="platforms" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Platform Performance
          </TabsTrigger>
          <TabsTrigger value="bots" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Bot ROI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="bg-stone-900 border-stone-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Growth Trend</CardTitle>
              <CardDescription className="text-gray-400">
                Monthly revenue and order volume generated by bot automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#FFD700" 
                    strokeWidth={3}
                    dot={{ fill: '#FFD700', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-stone-900 border-stone-700">
              <CardHeader>
                <CardTitle className="text-white">Revenue by Platform</CardTitle>
                <CardDescription className="text-gray-400">
                  Distribution of sales across social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-700">
              <CardHeader>
                <CardTitle className="text-white">Platform Performance</CardTitle>
                <CardDescription className="text-gray-400">
                  Engagement and conversion metrics by platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {platform.value}% revenue
                      </Badge>
                      <span className="text-green-400 text-sm">+12.5%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bots" className="space-y-4">
          <Card className="bg-stone-900 border-stone-700">
            <CardHeader>
              <CardTitle className="text-white">Bot Performance & ROI</CardTitle>
              <CardDescription className="text-gray-400">
                Detailed conversion and revenue analysis for each bot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData.map((bot) => (
                  <div key={bot.bot} className="border border-stone-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">{bot.bot}</h4>
                      <Badge className="bg-yellow-400 text-black">
                        ROI: {((bot.revenue / (bot.impressions * 0.01)) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Impressions</span>
                        <div className="font-medium text-white">{bot.impressions.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Clicks</span>
                        <div className="font-medium text-white">{bot.clicks}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Conversions</span>
                        <div className="font-medium text-white">{bot.conversions}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenue</span>
                        <div className="font-medium text-yellow-400">${bot.revenue}</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-stone-800 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${(bot.conversions / bot.clicks) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Conversion Rate: {((bot.conversions / bot.clicks) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}