import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Mail, Eye, MousePointer, FileText } from 'lucide-react';

const AnalyticsDashboard = () => {
  const analytics = [
    {
      title: "Email Open Rate",
      value: "68.5%",
      change: "+5.2%",
      progress: 68.5,
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Click-through Rate",
      value: "12.8%",
      change: "+2.1%",
      progress: 12.8,
      icon: MousePointer,
      color: "text-green-600"
    },
    {
      title: "Delivery Success",
      value: "95.2%",
      change: "+1.3%",
      progress: 95.2,
      icon: Mail,
      color: "text-purple-600"
    }
  ];

  const topPerformers = [
    {
      title: "10 AI Tools That Will Transform Your Workflow",
      openRate: "72%",
      clicks: "156",
      date: "2024-05-20"
    },
    {
      title: "The Future of Remote Work: Trends to Watch",
      openRate: "68%",
      clicks: "142",
      date: "2024-05-19"
    },
    {
      title: "Building Better User Experiences with AI",
      openRate: "65%",
      clicks: "128",
      date: "2024-05-18"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Email Analytics Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analytics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium text-gray-600">{metric.title}</span>
                </div>
                <span className="text-xs text-green-600">{metric.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <Progress value={metric.progress} className="h-2" />
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Best Performing Blogs
          </h3>
          <div className="space-y-3">
            {topPerformers.map((blog, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{blog.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-blue-600">
                    <Eye className="w-3 h-3" />
                    {blog.openRate}
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <MousePointer className="w-3 h-3" />
                    {blog.clicks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;