"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface OnboardingContainerProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
}

export  function OnboardingContainer({ children, currentStep, totalSteps }: OnboardingContainerProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <motion.div
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: 0.1,
            }}
          >
            <span className="text-white font-bold text-lg">A</span>
          </motion.div>
          <motion.h1
            className="text-xl font-bold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            AutoScribe AI
          </motion.h1>
        </div>
        {/* <ModeToggle /> */}
      </header>

      {currentStep < totalSteps && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"
              initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-3xl">{children}</div>
      </div>

      <footer className="text-center text-sm text-muted-foreground py-4">
        <p>© {new Date().getFullYear()} AutoScribe AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
