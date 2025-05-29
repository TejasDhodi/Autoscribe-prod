"use client";
import React from "react";
import { OnboardingJourney } from "@/components/onboarding";
import { OnboardingData } from "@/types/onboarding";
import { completeOnboarding } from "@/app/(protected)/onboarding/_action";
import { updateOnboardingData } from "@/actions/onboarding";

const OnboardingPage = () => {
  return (
    <div>
      <OnboardingJourney
        onJourneyComplete={async (data: OnboardingData) => {
          await completeOnboarding(data);
          await updateOnboardingData(data);
        }}
      />
    </div>
  );
};

export default OnboardingPage;
