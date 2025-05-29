import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';

const CreateBlogForm = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`# The Future of AI in Content Creation

Artificial Intelligence is revolutionizing how we create, distribute, and consume content. As we move into 2024, several key trends are emerging that will shape the landscape of digital content creation.

## Key Trends to Watch

1. **Personalized Content at Scale**: AI enables the creation of highly personalized content for different audience segments without compromising quality.

2. **Multi-modal Content Generation**: Modern AI can generate text, images, and even video content from simple prompts.

3. **Real-time Content Optimization**: AI analyzes engagement patterns and automatically adjusts content for better performance.

## The Impact on Content Creators

Content creators are finding that AI doesn't replace creativity—it amplifies it. By handling routine tasks, AI frees creators to focus on strategy and innovation.

*This content was generated using AI and is ready for review and customization.*`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Generate New Blog Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4 text-black">
              <div>
                <Label htmlFor="topic">Topic / Keywords</Label>
                <Input 
                  id="topic"
                  placeholder="e.g., AI in marketing, productivity tips, design trends"
                  className="mt-1 placeholder:text-black-90"
                />
              </div>
              
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select>
                  <SelectTrigger className="mt-1 black-select">
                    <SelectValue placeholder="Select writing tone"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="length">Content Length</Label>
                <Select>
                  <SelectTrigger className="mt-1 black-select">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (300-500 words)</SelectItem>
                    <SelectItem value="medium">Medium (500-1000 words)</SelectItem>
                    <SelectItem value="long">Long (1000+ words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4 text-black">
              <div>
                <Label htmlFor="additional">Additional Instructions</Label>
                <Textarea 
                  id="additional"
                  placeholder="Any specific requirements, style preferences, or key points to include..."
                  className="mt-1 min-h-[120px] placeholder:text-black-90"
                />
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload reference image</p>
                <p className="text-xs text-gray-500 mt-1">Will be optimized via PixelBin</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input 
                  id="recipient"
                  placeholder="recipient@email.com or list name"
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-2 pt-6">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateBlogForm;