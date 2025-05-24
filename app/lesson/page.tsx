import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () => {
  try {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([
      lessonData,
      userProgressData,
    ]);

    console.log("Lesson page - lesson:", lesson ? "found" : "not found");
    console.log("Lesson page - userProgress:", userProgress ? "found" : "not found");
    console.log("Lesson page - challenges:", lesson?.challenges?.length || 0);

    if (!userProgress) {
      console.log("No user progress, redirecting to learn");
      redirect("/learn");
    }

    // Get course info for flag display
    const courseInfo = userProgress.course ? {
      title: userProgress.course.title,
      flag: userProgress.course.flag
    } : undefined;

    if (!lesson || !lesson.challenges || lesson.challenges.length === 0) {
      console.log("No lesson or challenges found, showing placeholder");
      
      const placeholderLesson = {
        id: "placeholder-lesson",
        challenges: [
          {
            id: "placeholder-challenge",
            question: `Welcome to ${courseInfo?.title || "your language course"}!`,
            type: "SELECT",
            order: 1,
            completed: false,
            challengeOptions: [
              {
                id: "placeholder-option-1",
                text: "I'm ready to learn!",
                correct: true,
              },
              {
                id: "placeholder-option-2",
                text: "Let's get started!",
                correct: false,
              },
              {
                id: "placeholder-option-3",
                text: "I'm excited!",
                correct: false,
              },
            ],
          },
        ],
      };

      return (
        <Quiz
          initialLessonId={placeholderLesson.id}
          initialLessonChallenges={placeholderLesson.challenges}
          initialHearts={userProgress.hearts}
          initialPercentage={0}
          userSubscription={null}
          courseInfo={courseInfo}
        />
      );
    }

    const initialPercentage = lesson.challenges
      .filter((challenge) => challenge.completed)
      .length / lesson.challenges.length * 100;

    return (
      <Quiz
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={null}
        courseInfo={courseInfo}
      />
    );
  } catch (error) {
    console.log("Error in lesson page:", error);
    redirect("/learn");
  }
};

export default LessonPage;
