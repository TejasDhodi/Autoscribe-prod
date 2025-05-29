import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Mail, Edit, Upload } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "blog_generated",
      description: "Generated blog: '10 AI Tools That Will Transform Your Workflow'",
      timestamp: "2 hours ago",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "email_sent",
      description: "Email sent to marketing@company.com",
      timestamp: "4 hours ago",
      icon: Mail,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "blog_edited",
      description: "Edited blog: 'The Future of Remote Work'",
      timestamp: "6 hours ago",
      icon: Edit,
      color: "text-orange-600"
    },
    {
      id: 4,
      type: "image_uploaded",
      description: "Uploaded and optimized blog-header-ai-tools.jpg",
      timestamp: "8 hours ago",
      icon: Upload,
      color: "text-purple-600"
    },
    {
      id: 5,
      type: "email_sent",
      description: "Weekly newsletter sent to 1,234 subscribers",
      timestamp: "1 day ago",
      icon: Mail,
      color: "text-green-600"
    }
  ];

  const getActivityBadge = (type: string) => {
    const badges = {
      blog_generated: { variant: "default" as const, text: "Generated" },
      email_sent: { variant: "default" as const, text: "Sent" },
      blog_edited: { variant: "secondary" as const, text: "Edited" },
      image_uploaded: { variant: "outline" as const, text: "Uploaded" }
    };
    
    return badges[type as keyof typeof badges] || badges.blog_generated;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">{activity.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  <Badge {...getActivityBadge(activity.type)} className="text-xs">
                    {getActivityBadge(activity.type).text}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;