# Chat Bot - Next.js

A modern, responsive chat bot built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎨 Beautiful Modern UI
- 🎭 **3 Stunning Themes**: Light, Dark, and Gradient
- ✨ **Glassmorphism Effects**: Frosted glass design in gradient theme
- 🌈 **Gradient Animations**: Smooth color transitions
- 📋 **Copy Messages**: Click to copy any message to clipboard
- 🧹 **Clear Chat**: Reset conversation with one click
- 💬 **Auto-Resize Input**: Input grows as you type
- 🔢 **Character Counter**: Track message length
- ⌨️ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

### 🤖 AI Features
- ⚡ **Lightning Fast**: Powered by Groq (< 1 second responses)
- 🧠 **Smart Responses**: Llama 3.3 70B model
- 💬 **Real-time Messaging**: Instant message updates
- 🎯 **Typing Indicators**: See when bot is thinking
- 📊 **Message Counter**: Track conversation length

### 📱 Responsive & Accessible
- 📱 **Mobile Optimized**: Perfect on any device
- 🎯 **Touch Friendly**: Easy to use on touchscreens
- ♿ **Accessible**: WCAG AA compliant
- 🖱️ **Smooth Animations**: 60fps transitions
- 🎨 **Custom Scrollbars**: Beautiful gradient scrollbars

### 🔧 Technical
- ⚛️ **Next.js 14**: Latest App Router
- 🔷 **TypeScript**: Full type safety
- 🎨 **Tailwind CSS**: Utility-first styling
- 🚀 **Optimized**: Fast load times

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
chat-bot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint for chat messages
│   ├── components/
│   │   └── ChatBot.tsx          # Main chat component
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## How It Works

1. **Frontend**: The `ChatBot` component handles the UI and user interactions
2. **API**: The `/api/chat` route processes messages using Groq's Llama 3.3 70B
3. **AI Integration**: Powered by Groq - 100% FREE and extremely fast!

## Setup Requirements

### Groq API Key (Required - 100% FREE!)

This chat bot uses **Groq** - a FREE, FAST AI API powered by Llama 3.3 70B:

#### Quick Setup (5 minutes):

1. **Get FREE API Key**:
   - Go to [https://console.groq.com](https://console.groq.com)
   - Sign up (no credit card required!)
   - Navigate to "API Keys"
   - Click "Create API Key"
   - Copy your key (starts with `gsk_`)

2. **Create `.env.local` file** in project root:
   ```env
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

5. **Open browser**: [http://localhost:3000](http://localhost:3000)

**That's it!** Your chat bot is now powered by FREE, lightning-fast AI! ⚡

### Why Groq?

- ✅ **100% FREE** - No credit card needed
- ⚡ **EXTREMELY FAST** - 300-800ms response time
- 🚀 **Powerful** - Uses Llama 3.3 70B model
- 📊 **Generous limits** - 14,400 requests/day
- 🎯 **Perfect for chat** - Optimized for conversations


## Customization

### Changing AI Models

Edit `/app/api/chat/route.ts` to change the model:

```typescript
model: "llama-3.3-70b-versatile" // Current (recommended)
// Other options:
// "mixtral-8x7b-32768" - Fast and efficient
// "llama-3.1-70b-versatile" - Previous version
// "gemma2-9b-it" - Smaller, faster model
```

### Adjust Response Length

```typescript
max_tokens: 150 // Increase for longer responses
```

### Customize AI Personality

```typescript
content: "You are a helpful coding assistant..."
```

### Styling

- Colors: `tailwind.config.js`
- Global styles: `app/globals.css`
- Components: `app/components/ChatBot.tsx`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
1. Build the project: `npm run build`
2. Start the production server: `npm start`

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
