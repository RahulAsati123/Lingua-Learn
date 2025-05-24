"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const MOCK_USER_ID = "mock-user-123";

export const updateStreak = async () => {
  try {
    const user = await db.user.findUnique({
      where: { userId: MOCK_USER_ID }
    });

    if (!user) return;

    const today = new Date();
    const lastActive = user.updatedAt;
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = user.streak;

    if (daysDiff === 1) {
      // Consecutive day
      newStreak = user.streak + 1;
    } else if (daysDiff > 1) {
      // Streak broken
      newStreak = 1;
    }
    // If daysDiff === 0, same day, keep streak

    await db.user.update({
      where: { userId: MOCK_USER_ID },
      data: {
        streak: newStreak,
        updatedAt: today,
      }
    });

    revalidatePath("/learn");
    return { streak: newStreak };
  } catch (error) {
    console.log("Error updating streak:", error);
    return { error: "Failed to update streak" };
  }
};
