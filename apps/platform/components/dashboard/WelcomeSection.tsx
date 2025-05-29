import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from 'lucide-react';

const WelcomeSection = () => {
  const currentTime = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Welcome back, Creator!</CardTitle>
              <p className="text-blue-100 flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4" />
                {currentTime}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Email-Only Phase
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-blue-100 leading-relaxed">
          Your content creation hub is ready! Generate engaging blogs, optimize images, and deliver 
          compelling content directly to your audience's inbox with our streamlined email workflow.
        </p>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;