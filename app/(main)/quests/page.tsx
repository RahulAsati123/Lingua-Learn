import { Star, Clock, CheckCircle, Gift } from "lucide-react";

const dailyQuests = [
  {
    id: 1,
    title: "Complete 3 lessons",
    description: "Finish 3 lessons in any language",
    progress: 2,
    target: 3,
    reward: 50,
    completed: false,
  },
  {
    id: 2,
    title: "Perfect lesson",
    description: "Complete a lesson without any mistakes",
    progress: 1,
    target: 1,
    reward: 30,
    completed: true,
  },
  {
    id: 3,
    title: "5-minute practice",
    description: "Practice for at least 5 minutes",
    progress: 3,
    target: 5,
    reward: 20,
    completed: false,
  },
];

const weeklyQuests = [
  {
    id: 4,
    title: "Weekly warrior",
    description: "Complete lessons 7 days in a row",
    progress: 4,
    target: 7,
    reward: 200,
    completed: false,
  },
  {
    id: 5,
    title: "Language explorer",
    description: "Try lessons in 2 different languages",
    progress: 1,
    target: 2,
    reward: 150,
    completed: false,
  },
];

const QuestsPage = () => {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Star className="h-8 w-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-neutral-700">
          Quests
        </h1>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="h-5 w-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Daily Bonus
          </h2>
        </div>
        <p className="text-gray-600">
          Complete all daily quests to earn a 100 XP bonus!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Daily Quests
        </h2>
        <div className="space-y-4">
          {dailyQuests.map((quest) => (
            <div
              key={quest.id}
              className={`p-4 rounded-lg border-2 ${
                quest.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{quest.title}</h3>
                <div className="flex items-center gap-2">
                  {quest.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <span className="text-yellow-600 font-bold">
                    +{quest.reward} XP
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{quest.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        quest.completed ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{
                        width: `${(quest.progress / quest.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {quest.progress}/{quest.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-purple-500" />
          Weekly Quests
        </h2>
        <div className="space-y-4">
          {weeklyQuests.map((quest) => (
            <div
              key={quest.id}
              className="p-4 rounded-lg border-2 bg-white border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{quest.title}</h3>
                <span className="text-purple-600 font-bold">
                  +{quest.reward} XP
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{quest.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width: `${(quest.progress / quest.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {quest.progress}/{quest.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestsPage;
