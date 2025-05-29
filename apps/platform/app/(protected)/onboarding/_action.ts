"use server";

import { OnboardingData } from "@/types/onboarding";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (onboardingData: OnboardingData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        workSpaceName: onboardingData?.workspaceName,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
