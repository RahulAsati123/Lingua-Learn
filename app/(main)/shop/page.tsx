import { ShoppingCart, Heart, Zap, Shield, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

const shopItems = [
  {
    id: 1,
    name: "Refill Hearts",
    description: "Get full hearts to continue learning",
    price: 350,
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: 2,
    name: "Double XP",
    description: "Earn 2x XP for the next hour",
    price: 500,
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: 3,
    name: "Streak Freeze",
    description: "Protect your streak for one day",
    price: 200,
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 4,
    name: "Premium Hints",
    description: "Get helpful hints for difficult questions",
    price: 150,
    icon: Gem,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

const ShopPage = () => {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-8 w-8 text-green-500" />
        <h1 className="text-2xl font-bold text-neutral-700">
          Shop
        </h1>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Your Gems
            </h2>
            <p className="text-gray-600">
              Earn gems by completing lessons and quests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Gem className="h-6 w-6 text-blue-500" />
            <span className="text-2xl font-bold text-blue-600">1,250</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shopItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`p-6 rounded-lg border-2 ${item.bgColor} ${item.borderColor}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <IconComponent className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Gem className="h-4 w-4 text-blue-500" />
                  <span className="font-bold text-blue-600">{item.price}</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">
          How to earn more gems:
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Complete daily lessons (+10 gems)</li>
          <li>• Finish daily quests (+20-50 gems)</li>
          <li>• Maintain learning streaks (+5 gems per day)</li>
          <li>• Perfect lesson completion (+15 gems)</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopPage;
