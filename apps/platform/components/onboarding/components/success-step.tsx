"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

interface SuccessStepProps {
  workspaceName: string;
}

export function SuccessStep({ workspaceName }: SuccessStepProps) {
  // Confetti effect
  useEffect(() => {
    const confetti = async () => {
      const { default: confetti } = await import("canvas-confetti"!);

      const end = Date.now() + 1000;

      const colors = ["#9333ea", "#4f46e5", "#3b82f6"];
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });

        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    };

    confetti();
  }, []);

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        className="h-24 w-24 rounded-full bg-purple-500/20 flex items-center justify-center mb-8 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          delay: 0.3,
        }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500"
        >
          <motion.path
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
            variants={checkVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M22 4 12 14.01l-3-3"
            variants={checkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          />
        </svg>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        You're all set!
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-purple-400 font-medium">{workspaceName}</span> is
        ready to use. Start creating content or explore the dashboard.
      </motion.p>

      <motion.div
        className="w-full max-w-md bg-slate-800/50 rounded-xl p-6 mb-10 border border-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-semibold mb-4 text-left">Setup complete:</h3>
        <ul className="space-y-4 text-left">
          <motion.li
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Workspace created</span>
          </motion.li>
          <motion.li
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Persona selected</span>
          </motion.li>
          <motion.li
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Team invited</span>
          </motion.li>
        </ul>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <AnimatedButton className="flex-1 gap-2" size="lg">
          <Link href="/dashboard">Launch Dashboard</Link>
        </AnimatedButton>

        <AnimatedButton variant="outline" className="flex-1 gap-2" size="lg">
          <Link href="/templates">
            <Sparkles className="h-10 w-10" /> Browse Templates
          </Link>
        </AnimatedButton>
      </motion.div>
    </motion.div>
  );
}
