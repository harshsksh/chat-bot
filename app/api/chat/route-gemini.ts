import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }
    
    // Check if Google API key is available
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key is not configured. Please add GOOGLE_API_KEY to your .env.local file.' },
        { status: 503 }
      )
    }
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.7,
      }
    })
    
    // Generate response
    const result = await model.generateContent(message)
    const response = result.response.text()
    
    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Error processing chat message:', error)
    
    // Handle Google API specific errors
    if (error?.message?.includes('API_KEY_INVALID')) {
      return NextResponse.json(
        { error: 'Invalid Google API key. Please check your GOOGLE_API_KEY in .env.local file.' },
        { status: 401 }
      )
    }
    
    if (error?.message?.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: 'Google API quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: `Failed to process message: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}

