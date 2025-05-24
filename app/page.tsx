import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/images/icon.png" 
              alt="LinguaLearn Logo" 
              width={80} 
              height={80}
              className="rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LinguaLearn
          </h1>
          <p className="text-lg text-gray-600">
            Learn, practice, and master new languages
          </p>
        </div>
        
        <div className="space-y-4">
          <Button size="lg" className="w-full" asChild>
            <Link href="/learn">
              Start Learning
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="w-full">
            Sign In (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
}
