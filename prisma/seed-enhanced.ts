import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const languageQuestions = {
  French: [
    { question: "Which one means 'hello'?", options: ["Bonjour", "Au revoir", "Merci"], correct: 0 },
    { question: "What is 'cat' in French?", options: ["Chien", "Chat", "Oiseau"], correct: 1 },
    { question: "How do you say 'thank you'?", options: ["S'il vous plaît", "Excusez-moi", "Merci"], correct: 2 },
    { question: "What does 'eau' mean?", options: ["Water", "Fire", "Air"], correct: 0 },
    { question: "Which is the French word for 'red'?", options: ["Bleu", "Rouge", "Vert"], correct: 1 },
    { question: "How do you say 'good morning'?", options: ["Bonne nuit", "Bonjour", "Bonsoir"], correct: 1 },
    { question: "What is 'bread' in French?", options: ["Pain", "Lait", "Fromage"], correct: 0 },
    { question: "Which means 'I love you'?", options: ["Je vous déteste", "Je t'aime", "Je ne sais pas"], correct: 1 },
    { question: "What is the French word for 'house'?", options: ["Voiture", "Maison", "École"], correct: 1 },
    { question: "How do you say 'beautiful'?", options: ["Laid", "Beau/Belle", "Petit"], correct: 1 }
  ],
  German: [
    { question: "Which one means 'hello'?", options: ["Auf Wiedersehen", "Hallo", "Danke"], correct: 1 },
    { question: "What is 'dog' in German?", options: ["Katze", "Hund", "Vogel"], correct: 1 },
    { question: "How do you say 'please'?", options: ["Bitte", "Entschuldigung", "Danke"], correct: 0 },
    { question: "What does 'Wasser' mean?", options: ["Water", "Wine", "Milk"], correct: 0 },
    { question: "Which is the German word for 'blue'?", options: ["Rot", "Grün", "Blau"], correct: 2 },
    { question: "How do you say 'good night'?", options: ["Guten Morgen", "Guten Tag", "Gute Nacht"], correct: 2 },
    { question: "What is 'book' in German?", options: ["Buch", "Tisch", "Stuhl"], correct: 0 },
    { question: "Which means 'I am hungry'?", options: ["Ich bin müde", "Ich habe Hunger", "Ich bin glücklich"], correct: 1 },
    { question: "What is the German word for 'car'?", options: ["Fahrrad", "Auto", "Bus"], correct: 1 },
    { question: "How do you say 'cold'?", options: ["Heiß", "Warm", "Kalt"], correct: 2 }
  ],
  Spanish: [
    { question: "Which one means 'hello'?", options: ["Adiós", "Hola", "Gracias"], correct: 1 },
    { question: "What is 'fish' in Spanish?", options: ["Pollo", "Pez", "Carne"], correct: 1 },
    { question: "How do you say 'excuse me'?", options: ["Por favor", "Disculpe", "De nada"], correct: 1 },
    { question: "What does 'leche' mean?", options: ["Milk", "Juice", "Coffee"], correct: 0 },
    { question: "Which is the Spanish word for 'yellow'?", options: ["Amarillo", "Negro", "Blanco"], correct: 0 },
    { question: "How do you say 'good afternoon'?", options: ["Buenos días", "Buenas tardes", "Buenas noches"], correct: 1 },
    { question: "What is 'table' in Spanish?", options: ["Silla", "Mesa", "Cama"], correct: 1 },
    { question: "Which means 'How are you?'?", options: ["¿Qué tal?", "¿Cuántos años tienes?", "¿Dónde vives?"], correct: 0 },
    { question: "What is the Spanish word for 'school'?", options: ["Hospital", "Escuela", "Tienda"], correct: 1 },
    { question: "How do you say 'big'?", options: ["Pequeño", "Mediano", "Grande"], correct: 2 }
  ],
  Italian: [
    { question: "Which one means 'hello'?", options: ["Arrivederci", "Ciao", "Prego"], correct: 1 },
    { question: "What is 'wine' in Italian?", options: ["Acqua", "Vino", "Birra"], correct: 1 },
    { question: "How do you say 'you're welcome'?", options: ["Grazie", "Prego", "Scusi"], correct: 1 },
    { question: "What does 'sole' mean?", options: ["Moon", "Sun", "Star"], correct: 1 },
    { question: "Which is the Italian word for 'green'?", options: ["Rosso", "Verde", "Blu"], correct: 1 },
    { question: "How do you say 'good evening'?", options: ["Buongiorno", "Buon pomeriggio", "Buonasera"], correct: 2 },
    { question: "What is 'pizza' in Italian?", options: ["Pizza", "Pasta", "Gelato"], correct: 0 },
    { question: "Which means 'Where is...?'?", options: ["Come stai?", "Dove è...?", "Quanto costa?"], correct: 1 },
    { question: "What is the Italian word for 'family'?", options: ["Amico", "Famiglia", "Casa"], correct: 1 },
    { question: "How do you say 'delicious'?", options: ["Cattivo", "Buono", "Delizioso"], correct: 2 }
  ]
};

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
          title: "Unit 1 - Basics",
          description: "Learn essential vocabulary and phrases",
          order: 1,
          courseId: course.id,
        },
      });

      // Create lesson for each course
      const lesson = await prisma.lesson.create({
        data: {
          id: `${courseData.id}-lesson-1`,
          title: "Essential Vocabulary",
          order: 1,
          unitId: unit.id,
          courseId: course.id,
        },
      });

      // Get questions for this language
      const questions = languageQuestions[courseData.title as keyof typeof languageQuestions];

      // Create 10 challenges for each lesson
      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i];
        
        const challenge = await prisma.challenge.create({
          data: {
            id: `${courseData.id}-challenge-${i + 1}`,
            question: questionData.question,
            type: "SELECT",
            order: i + 1,
            lessonId: lesson.id,
          },
        });

        // Create 3 options for each challenge
        for (let j = 0; j < questionData.options.length; j++) {
          await prisma.challengeOption.create({
            data: {
              id: `${courseData.id}-option-${i + 1}-${j + 1}`,
              text: questionData.options[j],
              correct: j === questionData.correct,
              challengeId: challenge.id,
            },
          });
        }
      }
    }

    console.log("Database seeded successfully with 10 questions per language!");
    console.log("Total questions created:", courses.length * 10);

  } catch (error) {
    console.log("Seeding error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
