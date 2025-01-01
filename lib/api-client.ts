
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'An error occurred while processing your request');
  }

  if (!result.data) {
    throw new Error('Invalid response format');
  }

  return result.data;
}