import React from 'react';
import { 
  TrendingUp,
  FileText,
  Send,
  Mail,
  Image as ImageIcon,
  Settings
} from 'lucide-react';

const navigationItems = [
  {
    title: "Dashboard",
    icon: TrendingUp,
    value: "dashboard",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Create",
    icon: FileText,
    value: "create",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Pipeline",
    icon: Send,
    value: "pipeline",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Delivery",
    icon: Mail,
    value: "delivery",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Images",
    icon: ImageIcon,
    value: "images",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Settings",
    icon: Settings,
    value: "settings",
    gradient: "from-gray-500 to-slate-500"
  }
];

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileBottomNav = ({ activeTab, onTabChange }: MobileBottomNavProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 z-50 shadow-2xl">
      {/* Glow effect at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex justify-around items-center py-2 px-1">
        {navigationItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onTabChange(item.value)}
            className={`
              relative flex flex-col items-center justify-center p-2 min-w-0 flex-1 
              transition-all duration-300 ease-out rounded-xl mx-0.5
              ${activeTab === item.value
                ? `bg-gradient-to-t ${item.gradient} text-white shadow-lg transform scale-105`
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
              active:scale-95
            `}
          >
            {/* Icon container with glow effect */}
            <div className={`
              relative p-1 rounded-lg transition-all duration-300
              ${activeTab === item.value 
                ? 'bg-white/20 shadow-lg' 
                : 'hover:bg-white/10'
              }
            `}>
              <item.icon className={`
                w-5 h-5 transition-all duration-300
                ${activeTab === item.value ? 'text-white' : 'text-gray-400 group-hover:text-white'}
              `} />
              
              {/* Active indicator dot */}
              {activeTab === item.value && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
              )}
            </div>
            
            {/* Title with gradient */}
            <span className={`
              text-xs font-medium mt-1 truncate transition-all duration-300
              ${activeTab === item.value 
                ? 'text-white' 
                : 'text-gray-400'
              }
            `}>
              {item.title}
            </span>
            
            {/* Background glow for active item */}
            {activeTab === item.value && (
              <div className={`
                absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-20 
                rounded-xl blur-sm -z-10
              `}></div>
            )}
          </button>
        ))}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom"></div>
    </div>
  );
};

export default MobileBottomNav;