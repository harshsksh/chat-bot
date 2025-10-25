import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

// Initialize Groq client (Uses Llama models, very fast and free!)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }
    
    // Check if Groq API key is available
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key is not configured. Please add GROQ_API_KEY to your .env.local file.' },
        { status: 503 }
      )
    }
    
    // Call Groq API (extremely fast!)
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Latest Llama model
      // Other options: 'mixtral-8x7b-32768', 'gemma2-9b-it'
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Be friendly, concise, and helpful in your responses.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    })
    
    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
    
    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Error processing chat message:', error)
    
    // Handle Groq specific errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid Groq API key. Please check your GROQ_API_KEY in .env.local file.' },
        { status: 401 }
      )
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Groq rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: `Failed to process message: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}

