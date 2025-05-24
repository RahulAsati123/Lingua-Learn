"use client";

import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";

type Props = {
  courses: any[];
  activeCourseId?: string;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: string) => {
    console.log("Course clicked:", id);
    
    if (pending) {
      console.log("Already pending, ignoring click");
      return;
    }

    if (id === activeCourseId) {
      console.log("Same course, redirecting to lesson");
      router.push("/lesson");
      return;
    }

    console.log("Starting transition for course:", id);
    startTransition(() => {
      upsertUserProgress(id)
        .then(() => {
          console.log("User progress updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user progress:", error);
          router.push("/lesson");
        });
    });
  };

  console.log("Rendering courses:", courses.length);

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          flag={course.flag}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
