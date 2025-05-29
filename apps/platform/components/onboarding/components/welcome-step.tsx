"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        className="h-28 w-28 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-8 relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          delay: 0.3,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"
          initial={{ rotate: -45, x: -100 }}
          animate={{ rotate: -45, x: 200 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            repeatDelay: 2,
          }}
        />
        <span className="text-white text-4xl font-bold">A</span>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Welcome to AutoScribe AI
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Your intelligent content companion. Let's set up your workspace and get
        started in under a minute.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <AnimatedButton
          onClick={onNext}
          size="lg"
          className="gap-2 px-8 py-6 text-lg flex"
        >
          Begin Setup <ArrowRight className="h-10 w-10" />
        </AnimatedButton>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-900/20 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
