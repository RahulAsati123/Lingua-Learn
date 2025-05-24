import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data
    await prisma.challengeProgress.deleteMany();
    await prisma.challengeOption.deleteMany();
    await prisma.challenge.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.unit.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.course.deleteMany();

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

    // Create courses
    const courses = [
      { id: "french-course-id", title: "French", flag: "🇫🇷" },
      { id: "german-course-id", title: "German", flag: "🇩🇪" },
      { id: "spanish-course-id", title: "Spanish", flag: "🇪🇸" },
      { id: "italian-course-id", title: "Italian", flag: "🇮🇹" },
    ];

    for (const courseData of courses) {
      const course = await prisma.course.create({
        data: {
          id: courseData.id,
          title: courseData.title,
          description: `Learn ${courseData.title} from beginner to advanced`,
          imageSrc: `/images/${courseData.title.toLowerCase()}.png`,
          flag: courseData.flag,
        },
      });

      // Create unit for each course
      const unit = await prisma.unit.create({
        data: {
          id: `${courseData.id}-unit-1`,
          title: "Unit 1",
          description: "Learn the basics",
          order: 1,
          courseId: course.id,
        },
      });

      // Create lesson for each course
      const lesson = await prisma.lesson.create({
        data: {
          id: `${courseData.id}-lesson-1`,
          title: "Basic Vocabulary",
          order: 1,
          unitId: unit.id,
          courseId: course.id,
        },
      });

      // Create challenges for each lesson
      const challenge1 = await prisma.challenge.create({
        data: {
          id: `${courseData.id}-challenge-1`,
          question: `Welcome to ${courseData.title}! Choose the correct greeting:`,
          type: "SELECT",
          order: 1,
          lessonId: lesson.id,
        },
      });

      const challenge2 = await prisma.challenge.create({
        data: {
          id: `${courseData.id}-challenge-2`,
          question: `How do you say "Hello" in ${courseData.title}?`,
          type: "SELECT",
          order: 2,
          lessonId: lesson.id,
        },
      });

      // Create options for challenge 1
      const greetings = {
        French: ["Bonjour", "Au revoir", "Merci"],
        German: ["Hallo", "Auf Wiedersehen", "Danke"],
        Spanish: ["Hola", "Adiós", "Gracias"],
        Italian: ["Ciao", "Arrivederci", "Grazie"],
      };

      const correctGreeting = greetings[courseData.title as keyof typeof greetings];

      await prisma.challengeOption.createMany({
        data: [
          {
            id: `${courseData.id}-option-1-1`,
            text: correctGreeting[0],
            correct: true,
            challengeId: challenge1.id,
          },
          {
            id: `${courseData.id}-option-1-2`,
            text: correctGreeting[1],
            correct: false,
            challengeId: challenge1.id,
          },
          {
            id: `${courseData.id}-option-1-3`,
            text: correctGreeting[2],
            correct: false,
            challengeId: challenge1.id,
          },
        ],
      });

      // Create options for challenge 2
      await prisma.challengeOption.createMany({
        data: [
          {
            id: `${courseData.id}-option-2-1`,
            text: correctGreeting[1],
            correct: false,
            challengeId: challenge2.id,
          },
          {
            id: `${courseData.id}-option-2-2`,
            text: correctGreeting[0],
            correct: true,
            challengeId: challenge2.id,
          },
          {
            id: `${courseData.id}-option-2-3`,
            text: correctGreeting[2],
            correct: false,
            challengeId: challenge2.id,
          },
        ],
      });
    }

    console.log("Database seeded successfully with lessons for all courses!");

  } catch (error) {
    console.log("Seeding error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
