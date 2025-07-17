import { Link, useLocation } from "wouter";
import { Bot as BotIcon, Home, Plus, BarChart3, Newspaper, Settings, User, ChevronRight } from "lucide-react";

const navigationItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/create", icon: Plus, label: "Create Bot" },
  { href: "/bots", icon: BotIcon, label: "My Bots" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/feed", icon: Newspaper, label: "Social Feed" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-brand-brown border-r border-brand-gold-dark flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-brand-gold-dark">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center">
            <BotIcon className="text-brand-black text-xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-brand-gold">Smart Flow Systems</h1>
            <p className="text-xs text-brand-gold opacity-70">Bot Learning Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors cursor-pointer ${
                isActive 
                  ? "bg-brand-gold-dark text-brand-black" 
                  : "text-brand-gold hover:bg-brand-brown-light"
              }`}>
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-brand-gold-dark">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
            <User className="text-brand-black text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-brand-gold">Learning User</p>
            <p className="text-xs opacity-70">Beginner</p>
          </div>
          <ChevronRight className="text-xs opacity-50" />
        </div>
      </div>
    </div>
  );
}
