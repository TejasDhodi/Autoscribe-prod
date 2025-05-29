"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedButton } from "@/components/ui/animated-button";

interface TeamMember {
  email?: string;
  role?: string;
}

interface InviteTeamStepProps {
  onNext: (teamMembers: TeamMember[]) => Promise<void>;
  onSkip: () => void;
  onBack: () => void;
  teamMembers: TeamMember[];
}

export function InviteTeamStep({
  onNext,
  onSkip,
  onBack,
  teamMembers: initialTeamMembers,
}: InviteTeamStepProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    initialTeamMembers.length
      ? initialTeamMembers
      : [{ email: "", role: "member" }]
  )
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateMembers = () => {
    const newErrors = teamMembers.map((member) => {
      if (!member.email?.trim()) return "Email is required"
      if (!isValidEmail(member.email.trim())) return "Invalid email"
      return ""
    })
    setErrors(newErrors)
    return newErrors.every((err) => err === "")
  }

  const addTeamMember = () => {
    const last = teamMembers[teamMembers.length - 1]
    if (!last?.email?.trim() || !isValidEmail(last?.email)) return

    setTeamMembers([...teamMembers, { email: "", role: "member" }])
    setErrors((prev) => [...prev, ""])
  }

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
    setErrors(errors.filter((_, i) => i !== index))
  }

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)

    const newErrors = [...errors]
    if (field === "email") {
      if (!value.trim()) newErrors[index] = "Email is required"
      else if (!isValidEmail(value)) newErrors[index] = "Invalid email"
      else newErrors[index] = ""
      setErrors(newErrors)
    }
  }

  const handleNext = async () => {
    if (validateMembers()) {
      const validTeamMembers = teamMembers.filter((member) => member.email?.trim() !== "")
      await onNext(validTeamMembers)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const allValid = teamMembers.length > 0 && teamMembers.every(
      (member) =>
        typeof member.email === "string" &&
        member.email.trim() !== "" &&
        isValidEmail(member.email)
    )

  const lastEmail = teamMembers[teamMembers.length - 1]?.email
  const canAddMore =
    typeof lastEmail === "string" &&
    lastEmail.trim() !== "" &&
    isValidEmail(lastEmail)

  return (
    <motion.div
      key="invite-team"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <UserPlus className="h-6 w-6 text-purple-500" />
        <h1 className="text-3xl font-bold">Want to collaborate?</h1>
      </motion.div>

      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Invite team members to collaborate on content creation and publishing.
      </motion.p>

      <motion.div
        className="space-y-4 mb-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 items-start"
            >
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={member.email}
                  onChange={(e) =>
                    updateTeamMember(index, "email", e.target.value)
                  }
                  onFocus={() => setFocusedInput(`email-${index}`)}
                  onBlur={() => setFocusedInput(null)}
                  className={`transition-all duration-300 ${errors[index] ? "border-red-500" : "" }`}
                />
                {errors[index] && (
                  <p className="text-red-500 text-sm mt-1">{errors[index]}</p>
                )}

                {focusedInput === `email-${index}` && (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)",
                    }}
                  />
                )}
              </div>

              <div className="w-40">
                <Select
                  value={member.role}
                  onValueChange={(value) =>
                    updateTeamMember(index, "role", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="writer">Writer</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTeamMember(index)}
                  disabled={teamMembers.length === 1}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div variants={item}>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={addTeamMember}
            disabled={!canAddMore}
          >
            <Plus className="h-4 w-4" /> Add another
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <Button variant="outline" onClick={onSkip}>
            Skip
          </Button>
        </div>

        <AnimatedButton
          onClick={handleNext}
          disabled={!allValid || isLoading}
          className={`gap-2 ${!allValid ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Invite & Finish <ArrowRight className="h-4 w-4" />
        </AnimatedButton>
      </motion.div>
    </motion.div>
  );
}
