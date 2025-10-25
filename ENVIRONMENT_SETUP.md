# Environment Variables Setup

## Groq API (Current - FREE!)

Create a `.env.local` file in your project root:

```env
# Groq API Configuration (100% FREE!)
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### How to get your FREE Groq API Key:

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up (no credit card required!)
3. Navigate to "API Keys"
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)
6. Paste it in your `.env.local` file

**Benefits:**
- ✅ 100% FREE forever
- ⚡ Lightning fast (5-10x faster than others)
- 🚀 14,400 requests/day free
- 💪 Powered by Llama 3.3 70B

---

## Alternative Free APIs

If you want to try other free options, you can use:

### Google Gemini (Also FREE)
```env
GOOGLE_API_KEY=your_google_api_key_here
```
Get key: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Hugging Face (FREE)
```env
HUGGINGFACE_API_KEY=your_huggingface_token_here
```
Get key: [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Cohere (FREE Tier)
```env
COHERE_API_KEY=your_cohere_api_key_here
```
Get key: [https://dashboard.cohere.com/api-keys](https://dashboard.cohere.com/api-keys)

**See `FREE_API_SETUP.md` for instructions on using alternative APIs.**

---

## Security Notes:

- ✅ Never commit your `.env.local` file to version control
- ✅ The `.env.local` file is already in `.gitignore`
- ✅ Keep your API keys private
- ✅ Regenerate keys if accidentally exposed
