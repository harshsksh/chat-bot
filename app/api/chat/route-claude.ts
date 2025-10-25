import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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
    
    // Check if Anthropic API key is available
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key is not configured. Please add ANTHROPIC_API_KEY to your .env.local file.' },
        { status: 503 }
      )
    }
    
    // Call Anthropic Claude API
    const completion = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Fast and affordable
      // model: 'claude-3-sonnet-20240229', // Balanced
      // model: 'claude-3-opus-20240229', // Most powerful
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      system: 'You are a helpful AI assistant. Be friendly, concise, and helpful in your responses.'
    })
    
    const response = completion.content[0]?.text || "I'm sorry, I couldn't generate a response."
    
    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Error processing chat message:', error)
    
    // Handle Anthropic specific errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid Anthropic API key. Please check your ANTHROPIC_API_KEY in .env.local file.' },
        { status: 401 }
      )
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Anthropic rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: `Failed to process message: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}

