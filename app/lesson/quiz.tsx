"use client";

import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { useRouter } from "next/navigation";
import { ResultCard } from "./result-card";

type Props = {
  initialLessonId: string;
  initialLessonChallenges: any[];
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any;
  courseInfo?: {
    title: string;
    flag: string;
  };
};

export const Quiz = ({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubscription,
  courseInfo,
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<string>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: string) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    if (initialLessonId === "placeholder-lesson") {
      setStatus("correct");
      setPercentage((prev) => prev + 100 / challenges.length);
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then(() => {
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
          })
          .catch(() => {
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            setStatus("wrong");
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => {
            setStatus("wrong");
          });
      });
    }
  };

  if (!challenge) {
    return (
      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
        <div className="text-6xl mb-4">{courseInfo?.flag || "🎉"}</div>
        <div className="w-[100px] h-[100px] bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-4xl">✓</span>
        </div>
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job! <br /> You&apos;ve completed the {courseInfo?.title || "lesson"}.
        </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={challenges.length * 10} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
        <button
          onClick={() => router.push("/learn")}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Continue
        </button>
      </div>
    );
  }

  const title = challenge.type === "ASSIST"
    ? "Select the correct meaning"
    : challenge.question;

  return (
    <div className="flex flex-col h-screen">
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
        courseFlag={courseInfo?.flag}
        courseTitle={courseInfo?.title}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </div>
  );
};
