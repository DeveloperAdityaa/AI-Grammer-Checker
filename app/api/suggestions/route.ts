import { NextResponse } from 'next/server';
import { geminiClient } from '@/lib/gemini-client';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    console.log('Received text:', text);

    if (!text?.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return NextResponse.json(
        { error: 'Gemini API is not configured' },
        { status: 500 }
      );
    }

    const model = geminiClient.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Please provide 3 alternative versions of the following text, improving grammar, clarity, and style. Return only the improved versions, separated by newlines:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const suggestions = response.text().split('\n').filter(Boolean);
    
    if (!suggestions.length) {
      return NextResponse.json(
        { error: 'No suggestions generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { suggestions } });
  } catch (error: any) {
    console.error('Gemini API error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}