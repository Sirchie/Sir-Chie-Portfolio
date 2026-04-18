import { groq } from '@ai-sdk/groq';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/prompt';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = process.env.GROQ_API_KEY
    ? groq('llama-3.3-70b-versatile')
    : openai('gpt-4o-mini');

  const result = await streamText({
    model,
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.85,
    maxTokens: 800,
  });

  return result.toDataStreamResponse();
}
