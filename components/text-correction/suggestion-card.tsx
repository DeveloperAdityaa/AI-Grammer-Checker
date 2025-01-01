"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface SuggestionCardProps {
  suggestion: string;
  onFeedback: (isPositive: boolean) => void;
}

export function SuggestionCard({ suggestion, onFeedback }: SuggestionCardProps) {
  return (
    <Card className="p-4">
      <p className="text-sm mb-3">{suggestion}</p>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFeedback(true)}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          Helpful
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFeedback(false)}
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          Not Helpful
        </Button>
      </div>
    </Card>
  );
}