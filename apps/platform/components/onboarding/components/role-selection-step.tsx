"use client";

import React from "react";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Code, FileText, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";

interface RoleSelectionStepProps {
  onNext: (roles: string[]) => void;
  onBack: () => void;
  selectedRoles: string[];
}

export function RoleSelectionStep({
  onNext,
  onBack,
  selectedRoles: initialSelectedRoles,
}: RoleSelectionStepProps) {
  const [selectedRoles, setSelectedRoles] =
    React.useState<string[]>(initialSelectedRoles);

  const roles = [
    {
      id: "developer",
      title: "Developer",
      description:
        "Access to APIs, SDKs, and technical documentation to integrate AutoScribe into your applications.",
      icon: <Code className="h-10 w-10" />,
    },
    {
      id: "content-strategist",
      title: "Content Strategist",
      description:
        "Tools to plan, create, and schedule content across multiple platforms with AI assistance.",
      icon: <FileText className="h-10 w-10" />,
    },
    {
      id: "marketing-lead",
      title: "Marketing Lead",
      description:
        "Analytics, campaign management, and performance tracking for content across all channels.",
      icon: <PieChart className="h-10 w-10" />,
    },
  ];

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleNext = () => {
    onNext(selectedRoles);
  };

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

  return (
    <motion.div
      key="role-selection"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        How do you plan to use AutoScribe?
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Select all roles that apply to you. This helps us personalize your
        experience.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {roles.map((role) => (
          <motion.div
            key={role.id}
            variants={item}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleRole(role.id)}
            className={`
              relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 cursor-pointer
              transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10
              ${selectedRoles.includes(role.id) ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20" : ""}
            `}
          >
            {selectedRoles.includes(role.id) && (
              <motion.div
                className="absolute inset-0 bg-purple-500/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <motion.div
              className={`
                h-14 w-14 rounded-xl flex items-center justify-center mb-4
                ${
                  selectedRoles.includes(role.id)
                    ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white"
                    : "bg-slate-800 text-slate-400"
                }
              `}
              animate={
                selectedRoles.includes(role.id)
                  ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.4 }}
            >
              {role.icon}
            </motion.div>

            <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
            <p className="text-muted-foreground text-sm">{role.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <AnimatedButton
          onClick={handleNext}
          disabled={selectedRoles.length === 0}
          className="gap-2"
        >
          Continue <ArrowRight className="h-8 w-8" />
        </AnimatedButton>
      </motion.div>
    </motion.div>
  );
}
