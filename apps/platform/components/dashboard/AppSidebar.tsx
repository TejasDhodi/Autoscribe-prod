import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  return (
    <Sidebar
      className="hidden md:flex w-64 border-r border-gray-700/50 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl"
    >
      <SidebarContent className="p-4 flex flex-col">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className={`
                      flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium
                      text-gray-300 hover:text-white transition-all duration-200
                      ${activeTab === item.value
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'hover:bg-gray-700/30'}
                    `}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Brand section at bottom */}
        <div className="mt-auto pt-4 border-t border-gray-700/30">
          <div className="flex items-center px-4 space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <p className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AutoScribe
              </p>
              <p className="text-xs text-gray-500">AI Powered</p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
