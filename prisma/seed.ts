import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete existing data to avoid conflicts
    await prisma.userProgress.deleteMany({
      where: { userId: "mock-user-123" }
    });
    
    await prisma.user.deleteMany({
      where: { userId: "mock-user-123" }
    });

    // Create mock user
    await prisma.user.create({
      data: {
        userId: "mock-user-123",
        email: "mock@example.com",
        name: "Mock User",
        hearts: 5,
        points: 0,
        streak: 0,
      },
    });

    // Add courses
    const frenchCourse = await prisma.course.upsert({
      where: { id: "french-course-id" },
      create: {
        id: "french-course-id",
        title: "French",
        description: "Learn French from beginner to advanced",
        imageSrc: "/images/french.png",
        flag: "🇫🇷",
      },
      update: {},
    });

    const germanCourse = await prisma.course.upsert({
      where: { id: "german-course-id" },
      create: {
        id: "german-course-id",
        title: "German",
        description: "Master the German language",
        imageSrc: "/images/german.png",
        flag: "🇩🇪",
      },
      update: {},
    });

    // Create units and lessons for French
    const frenchUnit = await prisma.unit.upsert({
      where: { id: "french-unit-1" },
      create: {
        id: "french-unit-1",
        title: "Unit 1",
        description: "Learn the basics",
        order: 1,
        courseId: frenchCourse.id,
      },
      update: {},
    });

    const frenchLesson = await prisma.lesson.upsert({
      where: { id: "french-lesson-1" },
      create: {
        id: "french-lesson-1",
        title: "Nouns",
        order: 1,
        unitId: frenchUnit.id,
        courseId: frenchCourse.id,
      },
      update: {},
    });

    // Create challenges
    const challenge1 = await prisma.challenge.upsert({
      where: { id: "french-challenge-1" },
      create: {
        id: "french-challenge-1",
        question: "Which one of these is 'the man'?",
        type: "SELECT",
        order: 1,
        lessonId: frenchLesson.id,
      },
      update: {},
    });

    // Create challenge options
    await prisma.challengeOption.upsert({
      where: { id: "french-option-1" },
      create: {
        id: "french-option-1",
        text: "l'homme",
        correct: true,
        challengeId: challenge1.id,
      },
      update: {},
    });

    await prisma.challengeOption.upsert({
      where: { id: "french-option-2" },
      create: {
        id: "french-option-2",
        text: "la femme",
        correct: false,
        challengeId: challenge1.id,
      },
      update: {},
    });

    console.log("Database seeded successfully!");

  } catch (error) {
    console.log("Seeding error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
