import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail, Calendar, Edit } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    {
      title: "Total Blogs Generated",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Blogs Sent via Email",
      value: "18",
      change: "+8%",
      icon: Mail,
      color: "bg-green-500"
    },
    {
      title: "Scheduled Emails",
      value: "6",
      change: "+3",
      icon: Calendar,
      color: "bg-orange-500"
    },
    {
      title: "Drafts Pending Review",
      value: "3",
      change: "-2",
      icon: Edit,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;