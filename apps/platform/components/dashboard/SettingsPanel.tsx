import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail, Image as ImageIcon, FileText, CheckCircle, Clock } from 'lucide-react';

const SettingsPanel = () => {
  return (
    <Tabs defaultValue="email" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
        <TabsTrigger value="email" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
          <Mail className="w-4 h-4" />
          Email Settings
        </TabsTrigger>
        <TabsTrigger value="pixelbin" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
          <ImageIcon className="w-4 h-4" />
          PixelBin
        </TabsTrigger>
        <TabsTrigger value="docs" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
          <FileText className="w-4 h-4" />
          Documentation
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email">
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Mail className="w-5 h-5 text-blue-400" />
              Email Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fromEmail" className="text-gray-300">From Email Address</Label>
                <Input 
                  id="fromEmail"
                  placeholder="noreply@yourcompany.com"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="fromName" className="text-gray-300">From Name</Label>
                <Input 
                  id="fromName"
                  placeholder="Your Company Name"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="replyTo" className="text-gray-300">Reply-To Email</Label>
                <Input 
                  id="replyTo"
                  placeholder="support@yourcompany.com"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <Separator className="bg-gray-600" />

            <div className="space-y-4">
              <h3 className="font-semibold text-white">SMTP / API Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="provider" className="text-gray-300">Email Provider</Label>
                  <Input 
                    id="provider"
                    placeholder="SendGrid, Mailgun, etc."
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="apiKey" className="text-gray-300">API Key</Label>
                  <Input 
                    id="apiKey"
                    type="password"
                    placeholder="Your API key"
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Test Email Configuration
              </Button>
            </div>

            <Separator className="bg-gray-600" />

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Email Template Customization</h3>
              
              <div>
                <Label htmlFor="subject" className="text-gray-300">Subject Line Template</Label>
                <Input 
                  id="subject"
                  placeholder="[Blog] {{title}} - {{date}}"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="template" className="text-gray-300">Email HTML Template</Label>
                <Textarea 
                  id="template"
                  placeholder="Customize your email template here..."
                  className="mt-1 min-h-[200px] font-mono text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pixelbin">
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              PixelBin Integration
              <Badge variant="default" className="bg-green-600">
                Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pixelbinKey" className="text-gray-300">PixelBin API Key</Label>
                <Input 
                  id="pixelbinKey"
                  type="password"
                  placeholder="Your PixelBin API key"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="cloudName" className="text-gray-300">Cloud Name</Label>
                <Input 
                  id="cloudName"
                  placeholder="your-cloud-name"
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Test PixelBin Connection
              </Button>
            </div>

            <Separator className="bg-gray-600" />

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Default Optimization Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultQuality" className="text-gray-300">Default Quality</Label>
                  <Input 
                    id="defaultQuality"
                    placeholder="80"
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="defaultFormat" className="text-gray-300">Default Format</Label>
                  <Input 
                    id="defaultFormat"
                    placeholder="webp"
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxWidth" className="text-gray-300">Max Width (px)</Label>
                  <Input 
                    id="maxWidth"
                    placeholder="1200"
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="maxHeight" className="text-gray-300">Max Height (px)</Label>
                  <Input 
                    id="maxHeight"
                    placeholder="800"
                    className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="docs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5 text-green-400" />
                Quick Start Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  How to Write Effective Prompts
                </Button>
                <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  How to Schedule Emails
                </Button>
                <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Troubleshoot Delivery Issues
                </Button>
                <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image Optimization Best Practices
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Need help with your blog content dashboard? Our support team is here to assist you.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsPanel;