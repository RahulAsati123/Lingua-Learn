import { Trophy, Medal, Crown } from "lucide-react";

const mockLeaderboardData = [
  { id: 1, name: "Alex Johnson", points: 2450, streak: 15, avatar: "👨‍💻", language: "French", flag: "🇫🇷" },
  { id: 2, name: "Sarah Chen", points: 2380, streak: 12, avatar: "👩‍🎓", language: "German", flag: "🇩🇪" },
  { id: 3, name: "Mike Rodriguez", points: 2250, streak: 18, avatar: "👨‍🏫", language: "Spanish", flag: "🇪🇸" },
  { id: 4, name: "Emma Wilson", points: 2100, streak: 8, avatar: "👩‍💼", language: "Italian", flag: "🇮🇹" },
  { id: 5, name: "You", points: 1850, streak: 5, avatar: "🦉", language: "French", flag: "🇫🇷" },
  { id: 6, name: "David Kim", points: 1720, streak: 7, avatar: "👨‍🔬", language: "German", flag: "🇩🇪" },
  { id: 7, name: "Lisa Brown", points: 1650, streak: 4, avatar: "👩‍🎨", language: "Spanish", flag: "🇪🇸" },
  { id: 8, name: "Tom Anderson", points: 1580, streak: 6, avatar: "👨‍⚕️", language: "Italian", flag: "🇮🇹" },
];

const LeaderboardPage = () => {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-neutral-700">
          Leaderboard
        </h1>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Weekly Challenge
        </h2>
        <p className="text-gray-600">
          Complete 7 lessons this week to earn bonus XP!
        </p>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">4/7 lessons completed</p>
      </div>

      <div className="space-y-3">
        {mockLeaderboardData.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 ${
              user.name === "You" 
                ? "bg-blue-50 border-blue-200" 
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8">
                {index === 0 && <Crown className="h-6 w-6 text-yellow-500" />}
                {index === 1 && <Medal className="h-6 w-6 text-gray-400" />}
                {index === 2 && <Medal className="h-6 w-6 text-amber-600" />}
                {index > 2 && (
                  <span className="text-lg font-bold text-gray-500">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="text-2xl">{user.avatar}</div>
              <div>
                <p className={`font-semibold ${
                  user.name === "You" ? "text-blue-700" : "text-gray-800"
                }`}>
                  {user.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {user.streak} day streak 🔥
                  </span>
                  <span className="text-lg">{user.flag}</span>
                  <span className="text-xs text-gray-400">{user.language}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-yellow-600">
                {user.points.toLocaleString()} XP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
