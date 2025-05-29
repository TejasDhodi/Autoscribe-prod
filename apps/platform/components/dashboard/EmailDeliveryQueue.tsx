import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Mail, RefreshCw, Eye, MousePointer } from 'lucide-react';

const EmailDeliveryQueue = () => {
  const scheduledEmails = [
    {
      id: 1,
      title: "Weekly Newsletter: AI Trends",
      scheduledFor: "2024-05-25 10:00 AM",
      recipient: "newsletter@company.com",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Product Update: New Features",
      scheduledFor: "2024-05-26 2:00 PM",
      recipient: "Product Updates List",
      status: "scheduled"
    }
  ];

  const sentHistory = [
    {
      id: 1,
      title: "10 AI Tools That Will Transform Your Workflow",
      sentOn: "2024-05-20 9:30 AM",
      recipient: "marketing@company.com",
      openRate: "72%",
      clickRate: "15%",
      status: "delivered"
    },
    {
      id: 2,
      title: "The Future of Remote Work",
      sentOn: "2024-05-19 11:15 AM",
      recipient: "Weekly Newsletter List",
      openRate: "68%",
      clickRate: "12%",
      status: "delivered"
    },
    {
      id: 3,
      title: "Building Better User Experiences",
      sentOn: "2024-05-18 3:45 PM",
      recipient: "design@company.com",
      openRate: "0%",
      clickRate: "0%",
      status: "failed"
    }
  ];

  return (
    <Tabs defaultValue="scheduled" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="scheduled" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Scheduled Emails
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Delivery History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="scheduled">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Clock className="w-5 h-5 text-orange-600" />
              Scheduled Email Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledEmails.map((email) => (
                <div key={email.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{email.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {email.scheduledFor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {email.recipient}
                        </span>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          Scheduled
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className='text-black'>
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className='text-black'>
                        Edit Time
                      </Button>
                      <Button size="sm">
                        Send Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email Delivery History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentHistory.map((email) => (
                <div key={email.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{email.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>Sent: {email.sentOn}</span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {email.recipient}
                        </span>
                        {email.status === 'delivered' ? (
                          <>
                            <Badge variant="default" className="bg-green-600">
                              Delivered
                            </Badge>
                            <span className="flex items-center gap-1 text-green-600">
                              <Eye className="w-4 h-4" />
                              {email.openRate} opened
                            </span>
                            <span className="flex items-center gap-1 text-blue-600">
                              <MousePointer className="w-4 h-4" />
                              {email.clickRate} clicked
                            </span>
                          </>
                        ) : (
                          <Badge variant="destructive">
                            Failed
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {email.status === 'failed' && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Retry
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default EmailDeliveryQueue;