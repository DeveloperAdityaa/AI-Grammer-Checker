import { toast } from "sonner";

interface SuggestionsResponse {
  data: {
    suggestions: string[];
  };
  error?: string;
}

export async function fetchSuggestions(text: string): Promise<string[]> {
  try {
    const response = await fetch('/api/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const result: SuggestionsResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to generate suggestions');
    }

    return result.data.suggestions;
  } catch (error) {
    console.error('Failed to get suggestions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate suggestions';
    toast.error(errorMessage);
    throw error;
  }
}