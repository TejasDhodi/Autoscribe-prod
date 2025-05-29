'use client';

import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';
import AppSidebar from '@/components/dashboard/AppSidebar';
import MobileBottomNav from '@/components/dashboard/MobileBottomNav';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import QuickStats from '@/components/dashboard/QuickStats';
import BlogPipeline from '@/components/dashboard/BlogPipeline';
import CreateBlogForm from '@/components/dashboard/CreateBlogForm';
import EmailDeliveryQueue from '@/components/dashboard/EmailDeliveryQueue';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import ImageOptimization from '@/components/dashboard/ImageOptimization';
import RecentActivity from '@/components/dashboard/RecentActivity';
import SettingsPanel from '@/components/dashboard/SettingsPanel';

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <WelcomeSection />
            <QuickStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AnalyticsDashboard />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        );
      case "create":
        return <CreateBlogForm />;
      case "pipeline":
        return <BlogPipeline />;
      case "delivery":
        return <EmailDeliveryQueue />;
      case "images":
        return <ImageOptimization />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gray-900 text-white">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <SidebarInset className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-7xl pb-20 md:pb-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hidden md:flex text-gray-400 hover:text-white" />
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AutoScribe AI
                  </h1>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">Create, manage, and deliver your content via email</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search blogs, emails, analytics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full lg:w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl shrink-0">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Generate New Blog</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </SidebarInset>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </SidebarProvider>
  );
};

export default Home;