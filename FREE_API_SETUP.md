# 🆓 FREE AI API Setup Guide

## ✨ Best FREE Options (Ranked)

### 1. 🥇 **Groq** (RECOMMENDED - Already Implemented!)
**Status: Currently Active in Your Project**

- **Cost**: 100% FREE
- **Speed**: ⚡ EXTREMELY FAST (fastest AI API available)
- **Model**: Llama 3.3 70B (very powerful)
- **Limits**: 14,400 requests/day, 30 requests/minute
- **Quality**: Excellent (comparable to GPT-3.5)

#### Setup Groq (5 minutes):

1. **Get API Key**:
   - Go to [https://console.groq.com](https://console.groq.com)
   - Sign up with email (no credit card needed!)
   - Go to "API Keys" section
   - Click "Create API Key"
   - Copy your key

2. **Add to your project**:
   Create `.env.local` file:
   ```
   GROQ_API_KEY=gsk_your_groq_api_key_here
   ```

3. **Install package**:
   ```bash
   npm install groq-sdk
   ```

4. **Start using**:
   ```bash
   npm run dev
   ```

**That's it! You're done!** ✅

---

### 2. 🥈 **Google Gemini** (Great Free Option)

- **Cost**: FREE (generous limits)
- **Speed**: Fast
- **Model**: Gemini Pro
- **Limits**: 60 requests/minute
- **Quality**: Excellent

#### Setup Gemini:

1. **Get API Key**:
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Click "Create API Key"
   - Copy your key

2. **Install package**:
   ```bash
   npm install @google/generative-ai
   ```

3. **Replace route.ts** with route-gemini.ts:
   ```bash
   # Windows
   copy app\api\chat\route-gemini.ts app\api\chat\route.ts
   
   # Linux/Mac
   cp app/api/chat/route-gemini.ts app/api/chat/route.ts
   ```

4. **Add to `.env.local`**:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

---

### 3. 🥉 **Hugging Face** (Free but slower)

- **Cost**: FREE
- **Speed**: Moderate (slower than Groq)
- **Models**: Many open-source models
- **Limits**: Rate limited but generous
- **Quality**: Good (depends on model)

#### Setup Hugging Face:

1. **Get API Key**:
   - Go to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Sign up (no credit card needed)
   - Create new token
   - Copy token

2. **Install package**:
   ```bash
   npm install @huggingface/inference
   ```

3. **Use this code** in `app/api/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }
    
    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: 'Hugging Face API key is not configured.' },
        { status: 503 }
      )
    }
    
    const result = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: message,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
      }
    })
    
    return NextResponse.json({ response: result.generated_text })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: `Failed: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}
```

4. **Add to `.env.local`**:
   ```
   HUGGINGFACE_API_KEY=hf_your_token_here
   ```

---

### 4. **Cohere** (Free tier available)

- **Cost**: FREE tier (good limits)
- **Speed**: Fast
- **Model**: Command model
- **Limits**: 100 calls/minute
- **Quality**: Very good

#### Setup Cohere:

1. **Get API Key**:
   - Go to [https://dashboard.cohere.com/api-keys](https://dashboard.cohere.com/api-keys)
   - Sign up (no credit card)
   - Copy API key

2. **Install**:
   ```bash
   npm install cohere-ai
   ```

3. **Code**:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }
    
    if (!process.env.COHERE_API_KEY) {
      return NextResponse.json({ error: 'Cohere API key not configured' }, { status: 503 })
    }
    
    const response = await cohere.chat({
      message: message,
      model: 'command',
      max_tokens: 150,
    })
    
    return NextResponse.json({ response: response.text })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

## 📊 Comparison Table

| API | Cost | Speed | Quality | Setup Time | Rate Limits |
|-----|------|-------|---------|------------|-------------|
| **Groq** ⭐ | FREE | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ | 5 min | 14,400/day |
| Google Gemini | FREE | ⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | 5 min | 60/min |
| Hugging Face | FREE | ⚡⚡⚡ | ⭐⭐⭐ | 10 min | Generous |
| Cohere | FREE tier | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | 5 min | 100/min |

---

## 🚀 Quick Start (Using Groq - Already Set Up!)

Your project is already configured for Groq! Just:

1. **Get your free API key**: [console.groq.com](https://console.groq.com)

2. **Create `.env.local`**:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```

3. **Install and run**:
   ```bash
   npm install
   npm run dev
   ```

**Done!** 🎉

---

## 💡 Pro Tips

1. **Groq is the fastest** - Perfect for chat applications
2. **Gemini has best quality** - Google's latest model
3. **Mix APIs** - Use multiple as fallbacks
4. **All are truly FREE** - No credit card required
5. **High rate limits** - Good for development and small apps

---

## 🔄 Switch Between APIs

To switch APIs, just:
1. Install the package
2. Replace `route.ts` content
3. Update `.env.local` with new key
4. Restart server

---

## 🆘 Need Help?

Check `TROUBLESHOOTING.md` for common issues!

---

## ⚡ Why Groq is Best for This Project

- **Lightning fast** responses (300-800ms vs 2-5s for OpenAI)
- **100% free** forever
- **No credit card** needed
- **Powerful model** (Llama 3.3 70B)
- **Easy setup** (5 minutes)
- **Great for chat** applications

**Your chat bot is now FREE and FAST!** 🚀
