"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const MOCK_USER_ID = "mock-user-123";

export const upsertChallengeProgress = async (challengeId: string) => {
  await db.challengeProgress.upsert({
    where: {
      userId_challengeId: {
        userId: MOCK_USER_ID,
        challengeId,
      },
    },
    create: {
      userId: MOCK_USER_ID,
      challengeId,
      completed: true,
    },
    update: {
      completed: true,
    },
  });

  revalidatePath("/learn");
  revalidatePath("/lesson");
};
