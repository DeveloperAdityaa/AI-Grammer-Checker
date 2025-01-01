export const OPENAI_CONFIG = {
  model: "gpt-3.5-turbo",
  maxTokens: 1000,
  temperature: 0.7,
} as const;

export const API_ENDPOINTS = {
  suggestions: '/api/suggestions',
} as const;