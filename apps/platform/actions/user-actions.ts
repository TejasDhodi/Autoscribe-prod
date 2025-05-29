import { db, User } from "@autoscribe/db";

export interface UserData {
  name: User["name"];
  email: User["email"];
  first_name: User["first_name"];
  last_name: User["last_name"];
  avatar_url: User["avatar_url"];
  clerkId: User["clerkId"];
}

export const createUserData = async (
  user: UserData
): Promise<{
  user: User | null;
  error: boolean;
  errorMessage?: string;
}> => {
  try {
    const createdUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
        clerkId: user.clerkId,
      },
    });
    return {
      user: createdUser,
      error: false,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      user: null,
      error: true,
      errorMessage: "Error creating user",
    };
  }
};

export const updateUserData = async (
  user: UserData
): Promise<{
  user: User | null;
  error: boolean;
  errorMessage?: string;
}> => {
  try {
    if (!user.clerkId) throw new Error("User not found");
    const updatedUser = await db.user.update({
      where: {
        email: user.email,
        clerkId: user.clerkId,
      },
      data: {
        name: user.name,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
      },
    });
    return {
      error: false,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      user: null,
      error: true,
      errorMessage: "Error creating user",
    };
  }
};
