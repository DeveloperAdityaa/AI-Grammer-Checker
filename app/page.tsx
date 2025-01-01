"use client";

import { Card } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TextInput } from "@/components/text-correction/text-input";
import { SuggestionCard } from "@/components/text-correction/suggestion-card";
import { fetchSuggestions } from "@/lib/services/suggestions";

export default function Home() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const analyzeSentence = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setLoading(true);
    try {
      const newSuggestions = await fetchSuggestions(text);
      setSuggestions(newSuggestions);
    } catch {
      // Error is already handled in the service layer
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (suggestionIndex: number, isPositive: boolean) => {
    toast.success(
      isPositive ? "Thank you for the positive feedback!" : "Thanks for your feedback. We'll work on improving our suggestions."
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">
                Enhanced Text Correction
              </h1>
            </div>
            
            <TextInput
              text={text}
              onChange={setText}
              onAnalyze={analyzeSentence}
              loading={loading}
            />

            {suggestions.length > 0 && (
              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Suggestions</h2>
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionCard
                      key={index}
                      suggestion={suggestion}
                      onFeedback={(isPositive) => handleFeedback(index, isPositive)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}