"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedButton } from "@/components/ui/animated-button";
import { uploadImage } from "@/hooks/useImageUpload";

interface WorkspaceSetupStepProps {
  onNext: (data: {
    workspaceName: string;
    teamName: string;
    industry: string;
    logo: File | null;
  }) => void;
  onBack: () => void;
  workspaceData: {
    workspaceName: string;
    teamName: string;
    industry: string;
    logo: File | null;
  };
}

export function WorkspaceSetupStep({
  onNext,
  onBack,
  workspaceData: initialData,
}: WorkspaceSetupStepProps) {
  const [formData, setFormData] = useState({
    workspaceName: initialData.workspaceName || "",
    teamName: initialData.teamName || "",
    industry: initialData.industry || "",
    logo: initialData.logo || null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    workspaceName: "",
    teamName: "",
    industry: "",
    logo: "",
  });

  function validateField(name: string, value: any) {
    switch (name) {
      case "workspaceName":
      case "teamName":
        if (!value.trim()) return `${name === "workspaceName" ? "Workspace" : "Team"} name is required.`;
        if (value.trim().length < 3) return `Must be at least 3 characters.`;
        return "";
      case "industry":
        return value ? "" : "Please select an industry.";
      case "logo":
        if (!value) return "Logo is required.";
        // const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        // if (!validTypes.includes(value.type)) return "Invalid file type.";
        if (value.size > 2 * 1024 * 1024) return "File size should be less than 2MB.";
        return "";
      default:
        return "";
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") {
      const name = "industry";
      setFormData((prev) => ({ ...prev, [name]: e }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, e) }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateField("logo", file);
    setErrors((prev) => ({ ...prev, logo: error }));

    if (error) return;

    // setFormData((prev) => ({ ...prev, logo: file }));

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    const url = await uploadImage(file, 'user-logos');
    console.log(url);
    setFormData((prev) => ({ ...prev, logo: url }));
  };

  const handleNext = () => {
    const newErrors = {
      workspaceName: validateField("workspaceName", formData.workspaceName),
      teamName: validateField("teamName", formData.teamName),
      industry: validateField("industry", formData.industry),
      logo: validateField("logo", formData.logo),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    onNext(formData);
  };

  const industries = [
    "Technology", "Marketing", "E-commerce", "Education",
    "Healthcare", "Finance", "Media", "Other",
  ];

  return (
    <motion.div
      key="workspace-setup"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1 className="text-3xl font-bold mb-2">
        Let's create your workspace
      </motion.h1>
      <motion.p className="text-muted-foreground mb-8">
        Customize your workspace to match your team's needs.
      </motion.p>

      <div className="grid gap-6 mb-10">
        <div className="grid gap-3">
          <Label htmlFor="workspace-name">Workspace name</Label>
          <Input
            id="workspace-name"
            name="workspaceName"
            value={formData.workspaceName}
            onChange={handleChange}
            onFocus={() => setFocusedInput("workspace-name")}
            onBlur={() => setFocusedInput(null)}
            placeholder="My Awesome Workspace"
            required
          />
          {errors.workspaceName && (
            <p className="text-red-500 text-sm">{errors.workspaceName}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="team-name">Team/brand name</Label>
          <Input
            id="team-name"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            onFocus={() => setFocusedInput("team-name")}
            onBlur={() => setFocusedInput(null)}
            placeholder="Acme Inc."
            required
          />
          {errors.teamName && (
            <p className="text-red-500 text-sm">{errors.teamName}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="industry">Industry</Label>
          <Select value={formData.industry} onValueChange={handleChange}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind.toLowerCase()}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="logo">Logo (optional)</Label>
          <div className="flex items-center gap-4">
            <div
              className="h-20 w-20 rounded-xl border border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden bg-slate-800"
              onClick={() => fileInputRef.current?.click()}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <Upload className="h-6 w-6 text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                name="logo"
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                {logoPreview ? "Change Logo" : "Upload Logo"}
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 512x512px. Max 2MB.
              </p>
              {errors.logo && (
                <p className="text-red-500 text-sm">{errors.logo}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <AnimatedButton
          onClick={handleNext}
          disabled={
            !formData.workspaceName ||
            !formData.teamName ||
            !formData.industry ||
            !formData.logo
          }
          className="gap-2"
        >
          Continue
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
