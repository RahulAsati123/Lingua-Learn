import { db } from "@/lib/db";

const MOCK_USER_ID = "mock-user-123";

export const getUserProgress = async () => {
  const data = await db.userProgress.findFirst({
    where: {
      userId: MOCK_USER_ID,
    },
    include: {
      course: true,
    },
  });

  return data;
};

export const getCourses = async () => {
  const data = await db.course.findMany({
    orderBy: {
      title: "asc",
    },
  });
  return data;
};

export const getCourseById = async (courseId: string) => {
  const data = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  return data;
};

export const getLesson = async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.courseId) {
    const firstCourse = await db.course.findFirst();
    if (!firstCourse) return null;

    const data = await db.lesson.findFirst({
      where: {
        courseId: firstCourse.id,
      },
      include: {
        challenges: {
          orderBy: {
            order: "asc",
          },
          include: {
            challengeOptions: true,
            challengeProgress: {
              where: {
                userId: MOCK_USER_ID,
              },
            },
          },
        },
      },
    });

    if (!data || !data.challenges) {
      return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
      const completed = challenge.challengeProgress && 
        challenge.challengeProgress.length > 0 && 
        challenge.challengeProgress.every((progress) => progress.completed);

      return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges };
  }

  const data = await db.lesson.findFirst({
    where: {
      courseId: userProgress.courseId,
    },
    include: {
      challenges: {
        orderBy: {
          order: "asc",
        },
        include: {
          challengeOptions: true,
          challengeProgress: {
            where: {
              userId: MOCK_USER_ID,
            },
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed = challenge.challengeProgress && 
      challenge.challengeProgress.length > 0 && 
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
};
