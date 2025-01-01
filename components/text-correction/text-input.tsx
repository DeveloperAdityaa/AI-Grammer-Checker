"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TextInputProps {
  text: string;
  onChange: (text: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}

export function TextInput({ text, onChange, onAnalyze, loading }: TextInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium mb-2">
          Enter your text
        </label>
        <Textarea
          id="text"
          placeholder="Type or paste your text here..."
          className="min-h-[120px]"
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <Button
        onClick={onAnalyze}
        className="w-full"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Text"}
      </Button>
    </div>
  );
}