"use server";

import { OnboardingData } from "@/types/onboarding";
import { db } from "@autoscribe/db";
import { auth } from "@clerk/nextjs/server";

export const updateOnboardingData = async (onboardingData: OnboardingData) => {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return { message: "No Logged In User" };
  }

  try {
    await db.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: {
          clerkId: clerkUserId,
        },
        data: {
          meta: {
            roles: onboardingData?.roles || [],
          },
        },
      });

      const newWorkspace = await tx.workspace.create({
        data: {
          id: updatedUser.id,
          name: onboardingData.workspaceName || "",
          industry: onboardingData?.industry,
        },
      });

      await tx.workspaceUser.create({
        data: {
          userId: updatedUser?.id,
          workspaceId: newWorkspace?.id,
          role:
            onboardingData?.roles.length > 0
              ? (onboardingData?.roles[0] ?? "")
              : "",
        },
      });
    });

    return { message: "Onboarding data updated successfully" };
  } catch (error) {
    console.error("Onboarding transaction failed:", error);
    return { message: "Failed to update onboarding data", error };
  }
};
