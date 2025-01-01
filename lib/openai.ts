import { apiPost } from './api-client';
import { API_ENDPOINTS } from './config';

interface SuggestionsResponse {
  suggestions: string[];
}

export async function getTextSuggestions(text: string): Promise<string[]> {
  try {
    const { suggestions } = await apiPost<SuggestionsResponse>(
      API_ENDPOINTS.suggestions,
      { text }
    );
    return suggestions;
  } catch (error) {
    console.error('Failed to get suggestions:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to generate suggestions');
  }
}