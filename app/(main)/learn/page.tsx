import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const LearnPage = async () => {
  try {
    const coursesData = getCourses();
    const userProgressData = getUserProgress();

    const [courses, userProgress] = await Promise.all([
      coursesData,
      userProgressData,
    ]);

    console.log("Courses loaded:", courses.length);
    console.log("User progress:", userProgress?.courseId);

    return (
      <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-neutral-700">
          Language Courses
        </h1>
        <div className="text-sm text-gray-500 mb-4">
          Found {courses.length} courses
        </div>
        <List
          courses={courses}
          activeCourseId={userProgress?.courseId}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading learn page:", error);
    return (
      <div className="h-full max-w-[912px] px-3 mx-auto">
        <h1 className="text-2xl font-bold text-red-700">
          Error Loading Courses
        </h1>
        <p className="text-gray-600">
          Please check the console for more details.
        </p>
      </div>
    );
  }
};

export default LearnPage;
