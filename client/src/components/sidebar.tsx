import { Link, useLocation } from "wouter";
import { Bot as BotIcon, Home, Plus, BarChart3, Newspaper, Settings, User, ChevronRight, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navigationItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/create-bot", icon: Plus, label: "Create Bot" },
  { href: "/my-bots", icon: BotIcon, label: "My Bots" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/marketplace", icon: ShoppingCart, label: "Marketplace" },
  { href: "/social-feed", icon: Newspaper, label: "Social Feed" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-sfs-brown border-r border-sfs-gold/30 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sfs-gold/30">
        <div className="bubble-section flex items-center space-x-3 p-4">
          <div className="w-10 h-10 bg-sfs-gold rounded-xl flex items-center justify-center animate-glow">
            <BotIcon className="text-sfs-black text-xl" />
          </div>
          <div className="flex-1">
            <h1 className="text-display text-lg text-gold-shine">Smart Flow Systems</h1>
            <p className="text-xs text-gold-shine">Premium Bot Platform</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className={`bubble-section flex items-center space-x-3 p-4 font-medium transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "bg-sfs-gold text-sfs-black shadow-lg border-sfs-gold-bright" 
                  : "text-gold-shine hover:bg-sfs-brown-light hover:text-sfs-gold-bright hover:border-sfs-gold-bright hover:shadow-xl"
              }`}>
                <Icon className="w-5 h-5 text-gold-shine" />
                <span className="text-gold-shine">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sfs-gold/30">
        <div className="bubble-section flex items-center space-x-3 hover:bg-sfs-brown-light p-4 transition-all duration-300 cursor-pointer">
          <div className="w-8 h-8 bg-sfs-gold rounded-full flex items-center justify-center">
            <User className="text-sfs-black text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gold-shine">Learning User</p>
            <p className="text-xs text-gold-shine">Premium Member</p>
          </div>
          <ChevronRight className="text-xs text-gold-shine hover:text-sfs-gold-bright transition-colors" />
        </div>
      </div>
    </div>
  );
}
