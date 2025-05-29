"use client";
import React, { useMemo, useState } from "react";
import {
  InviteTeamStep,
  RoleSelectionStep,
  SuccessStep,
  WelcomeStep,
  OnboardingContainer,
  WorkspaceSetupStep,
} from "@/components/onboarding/components";
import { AnimatePresence } from "framer-motion";
import { OnboardingData } from "@/types/onboarding";

interface IOnboardingJourney {
  onJourneyComplete: (onBoardingData: OnboardingData) => Promise<void>;
}

export const OnboardingJourney = ({
  onJourneyComplete,
}: IOnboardingJourney) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    roles: [],
    workspaceName: "",
    teamName: "",
    industry: "",
    logo: null,
    teamMembers: [{ email: "", role: "member" }],
  });

  const steps = useMemo(() => {
    return [
      {
        id: "welcome",
        component: <WelcomeStep onNext={() => setCurrentStep(1)} />,
      },
      {
        id: "role-selection",
        component: (
          <RoleSelectionStep
            onNext={(roles) => {
              setOnboardingData((prev) => ({ ...prev, roles }));
              setCurrentStep(2);
            }}
            onBack={() => setCurrentStep(0)}
            selectedRoles={onboardingData.roles}
          />
        ),
      },
      {
        id: "workspace-setup",
        component: (
          <WorkspaceSetupStep
            onNext={(data) => {
              setOnboardingData((prev) => ({ ...prev, ...data }));
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
            workspaceData={{
              workspaceName: onboardingData.workspaceName,
              teamName: onboardingData.teamName,
              industry: onboardingData.industry,
              logo: onboardingData.logo ?? null,
            }}
          />
        ),
      },
      {
        id: "invite-team",
        component: (
          <InviteTeamStep
            onNext={async (teamMembers) => {
              let latestOnboardingData = onboardingData;
              setOnboardingData((prev) => {
                latestOnboardingData = { ...prev, teamMembers };
                return latestOnboardingData;
              });
              setCurrentStep(4);
              await onJourneyComplete(latestOnboardingData);
            }}
            onSkip={async () => {
              setCurrentStep(4)
              await onJourneyComplete(onboardingData);
            }}
            onBack={() => setCurrentStep(2)}
            teamMembers={onboardingData.teamMembers}
          />
        ),
      },
      {
        id: "success",
        component: (
          <SuccessStep
            workspaceName={onboardingData.workspaceName || "Your Workspace"}
          />
        ),
      },
    ];
  }, [onJourneyComplete, onboardingData]);

  return (
    // <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <main className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <OnboardingContainer
        currentStep={currentStep}
        totalSteps={steps.length - 1}
      >
        <AnimatePresence mode="wait">
          {steps[currentStep]!.component}
        </AnimatePresence>
      </OnboardingContainer>
    </main>
    // </ThemeProvider>
  );
};
