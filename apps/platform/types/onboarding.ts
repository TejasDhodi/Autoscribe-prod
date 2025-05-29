export type OnboardingData = {
  roles: string[];
  workspaceName: string;
  teamName: string;
  industry: string;
  logo?: File | null;
  teamMembers: Array<{ email?: string; role?: string }>;
};
