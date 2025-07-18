import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Zap,
  Crown
} from "lucide-react";

// Sample analytics data for e-commerce focus
const revenueData = [
  { month: "Jan", revenue: 12400, orders: 156 },
  { month: "Feb", revenue: 15600, orders: 198 },
  { month: "Mar", revenue: 18900, orders: 234 },
  { month: "Apr", revenue: 22100, orders: 267 },
  { month: "May", revenue: 25800, orders: 312 },
  { month: "Jun", revenue: 28400, orders: 356 }
];

const engagementData = [
  { platform: "TikTok", followers: 15420, engagement: 8.7, conversions: 234 },
  { platform: "Instagram", followers: 12890, engagement: 6.2, conversions: 189 },
  { platform: "Twitter", followers: 8650, engagement: 4.1, conversions: 98 },
  { platform: "YouTube", followers: 6780, engagement: 12.3, conversions: 156 }
];

const conversionData = [
  { name: "Direct Purchase", value: 45, color: "#FFD700" },
  { name: "Email Signup", value: 30, color: "#FFF44F" },
  { name: "Social Follow", value: 15, color: "#3E2723" },
  { name: "Content Share", value: 10, color: "#808080" }
];

const performanceMetrics = [
  {
    title: "Total Revenue",
    value: "$28,400",
    change: "+18.2%",
    isPositive: true,
    icon: DollarSign,
    description: "Monthly revenue generated through bot automation"
  },
  {
    title: "Conversion Rate",
    value: "12.4%",
    change: "+2.8%",
    isPositive: true,
    icon: Target,
    description: "Social media to purchase conversion rate"
  },
  {
    title: "Active Followers",
    value: "43.7K",
    change: "+15.6%",
    isPositive: true,
    icon: Users,
    description: "Total engaged followers across platforms"
  },
  {
    title: "Orders Processed",
    value: "356",
    change: "+12.1%",
    isPositive: true,
    icon: ShoppingCart,
    description: "Orders generated through automated engagement"
  }
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ecommerce-gold">
              E-Commerce Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your bot performance and revenue impact
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            Revenue Up 18.2%
          </Badge>
        </div>
      </motion.div>

      {/* Key Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="ecommerce-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <metric.icon className="h-8 w-8 text-ecommerce-gold" />
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.isPositive ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-ecommerce-gold">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Revenue and Orders Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card className="ecommerce-card">
          <CardHeader>
            <CardTitle className="text-ecommerce-gold">Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue generated through bot automation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
                <XAxis dataKey="month" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(62, 39, 35, 0.95)', 
                    border: '1px solid rgba(255, 215, 0, 0.3)',
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

        <Card className="ecommerce-card">
          <CardHeader>
            <CardTitle className="text-ecommerce-gold">Conversion Sources</CardTitle>
            <CardDescription>Where your sales are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="ecommerce-card">
          <CardHeader>
            <CardTitle className="text-ecommerce-gold">Platform Performance</CardTitle>
            <CardDescription>Engagement and conversion metrics by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
                <XAxis dataKey="platform" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(62, 39, 35, 0.95)', 
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="followers" fill="#3E2723" />
                <Bar dataKey="conversions" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Premium Analytics Upgrade */}
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
                Advanced Analytics Pro
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Unlock deeper insights with real-time tracking, custom KPIs, predictive analytics, and automated reports
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-yellow-500" />
                <span>Custom KPI dashboards</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
                <span>Predictive revenue modeling</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Real-time alerts & notifications</span>
              </div>
            </div>

            <Button 
              size="lg"
              className="premium-btn text-lg px-8 py-3"
            >
              Upgrade Analytics - $49/month
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}