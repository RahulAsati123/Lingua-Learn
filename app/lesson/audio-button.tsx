"use client";

import { Volume2 } from "lucide-react";
import { useState } from "react";

type Props = {
  text: string;
  language: string;
};

export const AudioButton = ({ text, language }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on course
      switch (language.toLowerCase()) {
        case 'french':
          utterance.lang = 'fr-FR';
          break;
        case 'german':
          utterance.lang = 'de-DE';
          break;
        case 'spanish':
          utterance.lang = 'es-ES';
          break;
        case 'italian':
          utterance.lang = 'it-IT';
          break;
        default:
          utterance.lang = 'en-US';
      }
      
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={playAudio}
      disabled={isPlaying}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      title="Listen to pronunciation"
    >
      <Volume2 className={`h-5 w-5 ${isPlaying ? 'text-blue-500' : 'text-gray-600'}`} />
    </button>
  );
};
