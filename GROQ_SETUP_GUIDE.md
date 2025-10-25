# 🚀 Groq API Setup Guide - Step by Step

## ⚡ What is Groq?

Groq is a **100% FREE** AI API that's incredibly fast! It uses Meta's Llama 3.3 70B model and is perfect for chat applications.

### Why Groq?
- ✅ **Completely FREE** - No credit card needed
- ⚡ **Lightning Fast** - 5-10x faster than OpenAI
- 🔥 **Powerful** - Uses state-of-the-art Llama 3.3 model
- 📊 **Generous Limits** - 14,400 requests/day (more than enough!)
- 🎯 **Easy Setup** - Takes only 5 minutes

---

## 📋 Step-by-Step Setup

### Step 1: Get Your FREE Groq API Key (2 minutes)

1. **Visit Groq Console**:
   - Open: [https://console.groq.com](https://console.groq.com)

2. **Sign Up**:
   - Click "Sign Up" or "Sign In"
   - Use your email or GitHub account
   - **No credit card required!** ✅

3. **Create API Key**:
   - Once logged in, look for "API Keys" in the left menu
   - Click "Create API Key"
   - Give it a name (e.g., "Chat Bot")
   - Click "Create"

4. **Copy Your Key**:
   - Your key will look like: `gsk_xxxxxxxxxxxxxxxxxxxxx`
   - **Copy it immediately** - you'll need it in the next step
   - Keep it safe and don't share it publicly

---

### Step 2: Configure Your Project (1 minute)

1. **Create Environment File**:
   - In your project root folder (`c:\Users\hr392\Desktop\DEV\chat-bot`)
   - Create a new file called `.env.local`
   - Paste this content:
   ```env
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```
   - Replace `gsk_your_actual_api_key_here` with your real key from Step 1

**Example `.env.local` file:**
```env
GROQ_API_KEY=gsk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
```

---

### Step 3: Install Dependencies (2 minutes)

Open PowerShell or Command Prompt in your project folder and run:

```bash
npm install
```

This will install the `groq-sdk` package and all other dependencies.

**Wait for installation to complete...** ⏳

---

### Step 4: Start Your Chat Bot! (30 seconds)

Run the development server:

```bash
npm run dev
```

Or simply double-click `start.bat` in your project folder!

**You should see:**
```
✓ Ready in 3.5s
○ Local:   http://localhost:3000
```

---

### Step 5: Test It! 🎉

1. **Open your browser**:
   - Go to: [http://localhost:3000](http://localhost:3000)

2. **Start chatting**:
   - Type a message: "Hello!"
   - Wait for the response (should be VERY fast!)
   - The bot is now powered by Llama 3.3 70B!

---

## ✅ Verification Checklist

Make sure everything is set up correctly:

- [ ] ✅ Created Groq account at console.groq.com
- [ ] ✅ Generated API key (starts with `gsk_`)
- [ ] ✅ Created `.env.local` file in project root
- [ ] ✅ Added `GROQ_API_KEY=gsk_...` to `.env.local`
- [ ] ✅ Ran `npm install` successfully
- [ ] ✅ Started dev server with `npm run dev`
- [ ] ✅ Opened http://localhost:3000 in browser
- [ ] ✅ Sent a test message and got a response

---

## 🔧 Troubleshooting

### Problem: "Groq API key is not configured"

**Solution:**
1. Check if `.env.local` file exists in project root
2. Check if `GROQ_API_KEY` is spelled correctly (case-sensitive!)
3. Make sure there are no spaces: `GROQ_API_KEY=gsk_...` (no space before/after `=`)
4. Restart the dev server after adding the key

### Problem: "Invalid Groq API key"

**Solution:**
1. Go back to [console.groq.com](https://console.groq.com)
2. Check if your API key is active
3. Copy the key again carefully
4. Make sure you copied the entire key (they're long!)
5. Update `.env.local` with the correct key
6. Restart server

### Problem: "Cannot find module 'groq-sdk'"

**Solution:**
```bash
npm install groq-sdk
```

Then restart the server.

### Problem: Server won't start

**Solution:**
1. Close any running servers (Ctrl+C)
2. Delete `.next` folder
3. Run `npm install` again
4. Run `npm run dev`

### Problem: Port 3000 already in use

**Solution:**
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill that process or use different port
npm run dev -- -p 3001
```

---

## 📊 Groq Rate Limits (FREE Tier)

You get these limits **completely FREE**:

- **14,400 requests per day**
- **30 requests per minute**
- **6,000 requests per hour**

This is more than enough for:
- ✅ Personal projects
- ✅ Development and testing
- ✅ Small to medium apps
- ✅ Learning and experimentation

---

## 🎯 Test Your Setup

Try these test messages:

1. **Basic Test**:
   - You: "Hello!"
   - Bot should respond in < 1 second

2. **Knowledge Test**:
   - You: "What is JavaScript?"
   - Bot should give detailed answer

3. **Conversation Test**:
   - You: "Tell me a joke"
   - Bot should be creative and funny

4. **Speed Test**:
   - Send multiple messages quickly
   - Responses should be very fast (300-800ms)

---

## 🔐 Security Tips

1. **Never commit `.env.local`** to git
   - It's already in `.gitignore` ✅

2. **Don't share your API key** publicly
   - Keep it secret and safe

3. **Regenerate if exposed**
   - If you accidentally share your key, generate a new one at console.groq.com

---

## 🚀 Next Steps

Now that your chat bot is working:

1. **Customize the bot**:
   - Edit system prompt in `app/api/chat/route.ts`
   - Change the bot's personality

2. **Try different models**:
   - `llama-3.3-70b-versatile` (current)
   - `mixtral-8x7b-32768` (faster)
   - `gemma2-9b-it` (smaller)

3. **Adjust settings**:
   - Change `max_tokens` for longer/shorter responses
   - Adjust `temperature` for creativity (0.1 = focused, 1.5 = creative)

4. **Deploy your bot**:
   - Deploy to Vercel (also free!)
   - Share with friends

---

## 💡 Pro Tips

1. **Groq is FAST** - Responses in 300-800ms (vs 2-5s for OpenAI)
2. **Completely free** - No hidden costs, ever
3. **Great for learning** - Perfect for AI experimentation
4. **Production ready** - Can handle real traffic
5. **Multiple models** - Try different ones for different tasks

---

## 🆘 Need More Help?

- **Groq Documentation**: [https://console.groq.com/docs](https://console.groq.com/docs)
- **Check `TROUBLESHOOTING.md`** in this project
- **Check `FREE_API_SETUP.md`** for alternative APIs
- **Browser Console** (F12) - Check for error messages

---

## 🎉 Congratulations!

Your chat bot is now powered by **FREE, lightning-fast AI**!

**Enjoy building! 🚀**

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Quick start (Windows)
start.bat
```
