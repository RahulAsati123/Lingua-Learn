import { Activity, Calendar, Clock, Award } from "lucide-react";

const weeklyData = [
  { day: "Mon", minutes: 15, lessons: 2 },
  { day: "Tue", minutes: 20, lessons: 3 },
  { day: "Wed", minutes: 0, lessons: 0 },
  { day: "Thu", minutes: 10, lessons: 1 },
  { day: "Fri", minutes: 25, lessons: 4 },
  { day: "Sat", minutes: 30, lessons: 5 },
  { day: "Sun", minutes: 18, lessons: 2 },
];

const achievements = [
  { id: 1, title: "First Lesson", description: "Complete your first lesson", earned: true, icon: "🎯" },
  { id: 2, title: "Week Warrior", description: "7-day streak", earned: true, icon: "⚡" },
  { id: 3, title: "Perfectionist", description: "Perfect lesson score", earned: true, icon: "💎" },
  { id: 4, title: "Polyglot", description: "Learn 3 languages", earned: false, icon: "🌍" },
  { id: 5, title: "Scholar", description: "100 lessons completed", earned: false, icon: "🎓" },
  { id: 6, title: "Lightning", description: "30-day streak", earned: false, icon: "⚡" },
];

const ProgressPage = () => {
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="h-8 w-8 text-purple-500" />
        <h1 className="text-2xl font-bold text-neutral-700">
          Your Progress
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-blue-600">Current Streak</p>
              <p className="text-2xl font-bold text-blue-700">5 Days</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-green-600">Time This Week</p>
              <p className="text-2xl font-bold text-green-700">118 min</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-purple-600">Total XP</p>
              <p className="text-2xl font-bold text-purple-700">2,450</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-gray-200 rounded-t flex flex-col justify-end" style={{ height: '120px' }}>
                <div 
                  className="bg-blue-500 rounded-t transition-all duration-300"
                  style={{ 
                    height: `${(day.minutes / maxMinutes) * 100}%`,
                    minHeight: day.minutes > 0 ? '8px' : '0px'
                  }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs font-medium text-gray-600">{day.day}</div>
                <div className="text-xs text-gray-500">{day.minutes}m</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
