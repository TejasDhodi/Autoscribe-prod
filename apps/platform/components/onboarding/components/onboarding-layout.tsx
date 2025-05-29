import type React from "react"
import { Progress } from "@/components/ui/progress"

interface OnboardingLayoutProps {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
}

export function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold">AutoScribe AI</h1>
          </div>
        </header>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="bg-background rounded-xl shadow-lg p-8 mb-8">{children}</div>
      </div>
  )
}
