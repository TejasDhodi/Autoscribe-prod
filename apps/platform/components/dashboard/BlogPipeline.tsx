import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Send, Calendar, Eye, Mail } from 'lucide-react';

const BlogPipeline = () => {
  const blogs = [
    {
      id: 1,
      title: "10 AI Tools That Will Transform Your Workflow",
      generatedOn: "2024-05-20",
      status: "ready",
      recipient: "newsletter@company.com",
      openRate: "68%"
    },
    {
      id: 2,
      title: "The Future of Remote Work: Trends to Watch",
      generatedOn: "2024-05-19",
      status: "scheduled",
      recipient: "Weekly Newsletter List",
      scheduledFor: "2024-05-25"
    },
    {
      id: 3,
      title: "Building Better User Experiences with AI",
      generatedOn: "2024-05-18",
      status: "draft",
      recipient: "Not Set",
      openRate: null
    },
    {
      id: 4,
      title: "Marketing Automation Best Practices",
      generatedOn: "2024-05-17",
      status: "sent",
      recipient: "marketing@company.com",
      openRate: "72%"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { variant: "secondary" as const, text: "Draft" },
      ready: { variant: "default" as const, text: "Ready to Send" },
      scheduled: { variant: "outline" as const, text: "Scheduled" },
      sent: { variant: "secondary" as const, text: "Sent" }
    };
    
    return variants[status as keyof typeof variants] || variants.draft;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Send className="w-5 h-5 text-blue-600" />
          Content Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{blog.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span>Generated: {blog.generatedOn}</span>
                    <Badge {...getStatusBadge(blog.status)}>{getStatusBadge(blog.status).text}</Badge>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {blog.recipient}
                    </span>
                    {blog.openRate && (
                      <span className="text-green-600 font-medium">
                        Open Rate: {blog.openRate}
                      </span>
                    )}
                    {blog.scheduledFor && (
                      <span className="text-orange-600">
                        Scheduled: {blog.scheduledFor}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className='text-black'>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {blog.status === 'draft' || blog.status === 'ready' ? (
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      Send Now
                    </Button>
                  ) : null}
                  {blog.status === 'ready' && (
                    <Button variant="outline" size="sm" className='text-black' >
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className='text-black'>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPipeline;