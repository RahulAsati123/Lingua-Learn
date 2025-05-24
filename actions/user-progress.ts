"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const MOCK_USER_ID = "mock-user-123";

export const upsertUserProgress = async (courseId: string) => {
  try {
    console.log("upsertUserProgress called with courseId:", courseId);
    
    // First, check if the course exists
    const course = await db.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      throw new Error(`Course with id ${courseId} not found`);
    }

    // Check if user progress already exists
    const existingUserProgress = await db.userProgress.findFirst({
      where: {
        userId: MOCK_USER_ID,
      },
    });

    if (existingUserProgress) {
      // Update existing progress
      await db.userProgress.update({
        where: {
          userId_courseId: {
            userId: MOCK_USER_ID,
            courseId: existingUserProgress.courseId,
          },
        },
        data: {
          courseId,
        },
      });
    } else {
      // Create new progress
      await db.userProgress.create({
        data: {
          userId: MOCK_USER_ID,
          courseId,
        },
      });
    }

    console.log("User progress updated successfully");
    
    revalidatePath("/learn");
    revalidatePath("/lesson");
    
  } catch (error) {
    // Better error handling to avoid the payload issue
    if (error instanceof Error) {
      console.log("Database error:", error.message);
      throw new Error(`Failed to update user progress: ${error.message}`);
    } else {
      console.log("Unknown error occurred");
      throw new Error("Failed to update user progress: Unknown error");
    }
  }
  
  redirect("/lesson");
};

export const reduceHearts = async (challengeId: string) => {
  try {
    const currentUserProgress = await db.userProgress.findFirst({
      where: {
        userId: MOCK_USER_ID,
      },
    });

    if (!currentUserProgress) {
      throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts === 0) {
      return { error: "hearts" };
    }

    await db.userProgress.update({
      where: {
        userId_courseId: {
          userId: MOCK_USER_ID,
          courseId: currentUserProgress.courseId,
        },
      },
      data: {
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
      },
    });

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/lesson");
    
  } catch (error) {
    if (error instanceof Error) {
      console.log("Database error:", error.message);
      return { error: error.message };
    } else {
      console.log("Unknown error occurred");
      return { error: "Unknown error" };
    }
  }
};
