import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, Upload, Settings, Download } from 'lucide-react';

const ImageOptimization = () => {
  const optimizedImages = [
    {
      id: 1,
      name: "blog-header-ai-tools.jpg",
      originalSize: "2.4 MB",
      optimizedSize: "180 KB",
      savings: "92%",
      dimensions: "1200x600",
      status: "optimized"
    },
    {
      id: 2,
      name: "remote-work-illustration.png",
      originalSize: "1.8 MB",
      optimizedSize: "145 KB",
      savings: "91%",
      dimensions: "1000x800",
      status: "optimized"
    },
    {
      id: 3,
      name: "user-experience-diagram.jpg",
      originalSize: "3.1 MB",
      optimizedSize: "220 KB",
      savings: "93%",
      dimensions: "1400x700",
      status: "optimized"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Upload & Optimize Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Images</h3>
            <p className="text-sm text-gray-600 mb-4">
              Drag and drop your images here or click to browse
            </p>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Optimization Settings
              </h3>
              
              <div>
                <Label htmlFor="quality">Quality</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (90%)</SelectItem>
                    <SelectItem value="medium">Medium (75%)</SelectItem>
                    <SelectItem value="low">Low (60%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="format">Output Format</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (WebP/JPEG)</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Resize Options</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width (px)</Label>
                  <Input id="width" placeholder="1200" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="height">Height (px)</Label>
                  <Input id="height" placeholder="600" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="watermark">Watermark</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Add watermark" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Watermark</SelectItem>
                    <SelectItem value="logo">Company Logo</SelectItem>
                    <SelectItem value="text">Text Watermark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
            Optimized Images History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizedImages.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{image.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>Original: {image.originalSize}</span>
                      <span>Optimized: {image.optimizedSize}</span>
                      <Badge variant="default" className="bg-green-600">
                        {image.savings} saved
                      </Badge>
                      <span>{image.dimensions}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm">
                      Use in Blog
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageOptimization;