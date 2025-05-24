"use client";

import { Mic, MicOff, Volume2 } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  phrase: string;
  language: string;
  onComplete: (success: boolean) => void;
};

export const SpeakingChallenge = ({ phrase, language, onComplete }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  const playPhrase = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase);
      
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
      
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.lang = language === 'French' ? 'fr-FR' : 
                                   language === 'German' ? 'de-DE' :
                                   language === 'Spanish' ? 'es-ES' :
                                   language === 'Italian' ? 'it-IT' : 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        setIsListening(true);
        setFeedback("");
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const targetPhrase = phrase.toLowerCase();
        
        // Simple similarity check
        const similarity = calculateSimilarity(transcript, targetPhrase);
        
        if (similarity > 0.7) {
          setFeedback("Great pronunciation! 🎉");
          setTimeout(() => onComplete(true), 1500);
        } else {
          setFeedback(`Try again! You said: "${transcript}"`);
        }
      };
      
      recognitionRef.current.onerror = () => {
        setFeedback("Could not hear you clearly. Try again!");
        setIsRecording(false);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setIsListening(false);
      };
      
      recognitionRef.current.start();
    } else {
      setFeedback("Speech recognition not supported in this browser");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Speaking Practice
      </h3>
      
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-xl font-medium text-gray-800 mb-2">{phrase}</p>
        <Button
          onClick={playPhrase}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Volume2 className="h-4 w-4" />
          Listen
        </Button>
      </div>

      <div className="mb-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={`gap-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          size="lg"
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          {isRecording ? 'Stop Recording' : 'Start Speaking'}
        </Button>
      </div>

      {isListening && (
        <div className="mb-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Listening...</span>
          </div>
        </div>
      )}

      {feedback && (
        <div className={`p-3 rounded-lg ${
          feedback.includes('Great') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {feedback}
        </div>
      )}
    </div>
  );
};
