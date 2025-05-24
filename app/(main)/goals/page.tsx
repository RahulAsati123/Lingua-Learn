import { Flag, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const goalOptions = [
  { id: 1, name: "Casual", lessons: 1, description: "5 minutes a day", icon: "😊" },
  { id: 2, name: "Regular", lessons: 2, description: "10 minutes a day", icon: "📚" },
  { id: 3, name: "Serious", lessons: 3, description: "15 minutes a day", icon: "🎯" },
  { id: 4, name: "Intense", lessons: 5, description: "20 minutes a day", icon: "🔥" },
];

const weeklyProgress = [
  { day: "Mon", completed: true, lessons: 2 },
  { day: "Tue", completed: true, lessons: 3 },
  { day: "Wed", completed: false, lessons: 0 },
  { day: "Thu", completed: true, lessons: 1 },
  { day: "Fri", completed: false, lessons: 0 },
  { day: "Sat", completed: false, lessons: 0 },
  { day: "Sun", completed: false, lessons: 0 },
];

const GoalsPage = () => {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Flag className="h-8 w-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-neutral-700">
          Daily Goals
        </h1>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Current Goal</h2>
            <p className="text-gray-600">Regular - 2 lessons per day</p>
          </div>
          <div className="text-4xl">📚</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-600">1/2 lessons today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            This Week
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  day.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {day.lessons}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-bold text-orange-500">5 days 🔥</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Lessons</span>
              <span className="font-bold">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-bold text-blue-500">23 lessons</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Change Your Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {goalOptions.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-300 cursor-pointer transition-colors"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{goal.icon}</div>
                <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                <p className="text-xs text-gray-500">{goal.lessons} lesson{goal.lessons > 1 ? 's' : ''}/day</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
