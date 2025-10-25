# Troubleshooting Guide

## Common Issues and Solutions

### 1. Hydration Error ✅ FIXED

**Error Message:**
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**Cause:**
- The `timestamp.toLocaleTimeString()` generates different values on server vs client
- Initial state with `new Date()` causes server/client mismatch

**Solution:**
- Initialize messages in `useEffect` hook after component mounts
- Add loading state during hydration
- This ensures consistent rendering between server and client

### 2. Send Button Not Working ✅ FIXED

**Symptoms:**
- Button appears clickable but nothing happens
- No message sent to API

**Cause:**
- `inputText` was cleared before being sent to API
- Variable reference issue in async function

**Solution:**
- Store message in constant before clearing input
- Use stored value in API call

### 3. OpenAI API Integration

**Common Errors:**

#### "Invalid API Key"
```
Error: 401 Unauthorized
```
**Fix:** 
- Check `.env.local` file exists
- Verify API key is correct (starts with `sk-`)
- Restart dev server after adding env variables

#### "Insufficient Credits"
```
Error: 429 Rate Limit Exceeded
```
**Fix:**
- Add credits at https://platform.openai.com/account/billing
- Check usage limits

#### "Module not found: Can't resolve 'openai'"
**Fix:**
```bash
npm install openai
```

### 4. Dev Server Issues

**Port Already in Use:**
```
Error: Port 3000 is already in use
```
**Fix:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

**Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### 5. Styling Issues

**Tailwind Not Working:**
- Check `tailwind.config.js` paths
- Verify `globals.css` has `@tailwind` directives
- Restart dev server

**Icons Not Showing:**
```bash
npm install lucide-react
```

### 6. TypeScript Errors

**Type Errors:**
```bash
# Regenerate types
rm -rf .next
npm run dev
```

### 7. Browser Console Checks

Open browser console (F12) and check for:
- Network errors (Failed to fetch)
- CORS errors (should not happen in Next.js)
- JavaScript errors
- Debug logs from `console.log('Sending message:', messageToSend)`

### 8. Debugging Steps

1. **Check server is running:**
   ```bash
   npm run dev
   ```

2. **Verify API route:**
   - Open http://localhost:3000/api/chat in browser
   - Should see "Method Not Allowed" (expected, since it needs POST)

3. **Test API manually:**
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"hello"}'
   ```

4. **Check browser console for errors**

5. **Verify all files exist:**
   - `app/components/ChatBot.tsx`
   - `app/api/chat/route.ts`
   - `app/page.tsx`
   - `app/layout.tsx`

### 9. Performance Issues

**Slow Response Times:**
- Check OpenAI API status
- Reduce `max_tokens` in API call
- Add loading indicators (already implemented)

**Memory Leaks:**
- Clear old messages periodically
- Limit message history

### 10. Production Deployment

**Environment Variables:**
```bash
# Vercel
vercel env add OPENAI_API_KEY

# Other platforms
Add OPENAI_API_KEY to environment settings
```

**Build Issues:**
```bash
npm run build
npm start
```

## Need More Help?

1. Check browser console for specific errors
2. Check terminal/server logs
3. Verify all dependencies installed: `npm install`
4. Try clearing cache: `rm -rf .next node_modules && npm install`

## Useful Commands

```bash
# Start fresh
rm -rf .next node_modules package-lock.json
npm install
npm run dev

# Check for updates
npm outdated

# Update all packages
npm update

# Verify installation
npm list next react openai
```
