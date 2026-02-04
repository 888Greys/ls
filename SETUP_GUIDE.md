# Quick Setup Guide 🚀

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

Wait for all packages to install (React 19, Vite 6, TypeScript, etc.)

### 2️⃣ Setup Telegram Bot

#### A. Create Your Bot:
1. Open Telegram app
2. Search for `@BotFather`
3. Send: `/newbot`
4. Choose a name: `EcoCash Loan Bot` (or any name)
5. Choose a username: `ecocash_loan_bot` (must end with 'bot')
6. **Copy the Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

#### B. Get Your Chat ID:
1. Send a message to your new bot (any message)
2. Open this URL in browser (replace YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Find `"chat":{"id":XXXXXXXXX` in the response
4. **Copy the Chat ID** (the number after "id":")

### 3️⃣ Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file and add your credentials:
   ```env
   VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   VITE_TELEGRAM_CHAT_ID=123456789
   ```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Your app will open at: `http://localhost:3000`

### 5️⃣ Test the Application

1. Wait 3 seconds for splash screen
2. Fill out the loan form
3. Click "Submit Application"
4. Check your Telegram for the message! 🎉

---

## Deploy to Netlify (3 minutes)

### Option A: Github + Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings (auto-detected from netlify.toml):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables:
     - `VITE_TELEGRAM_BOT_TOKEN` = your bot token
     - `VITE_TELEGRAM_CHAT_ID` = your chat id
   - Click "Deploy site"

### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Option C: Drag & Drop

```bash
# Build the project
npm run build

# Go to netlify.com/drop
# Drag the 'dist' folder
# Add environment variables in site settings
```

---

## Troubleshooting 🔧

### Issue: "Module not found" errors
**Solution:** Run `npm install` again

### Issue: Telegram messages not sending
**Solutions:**
- Check `.env` file has correct token and chat ID
- Make sure you sent a message to the bot first
- Verify bot token at `https://api.telegram.org/botYOUR_TOKEN/getMe`

### Issue: Build fails on Netlify
**Solutions:**
- Check environment variables are set in Netlify dashboard
- Ensure Node version is 20+ (set in netlify.toml)
- Check build logs for specific errors

### Issue: Styles not loading
**Solution:** Tailwind CSS loads from CDN - check internet connection

---

## Project Structure 📁

```
ecocashloan/
├── 📄 index.html              # HTML with CDN links
├── 📄 package.json            # React 19, Vite 6 dependencies
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tsconfig.json           # TypeScript config
├── 📄 netlify.toml            # Netlify deployment
├── 📄 .env.example            # Environment template
├── 📁 src/
│   ├── 📄 main.tsx            # App entry point
│   ├── 📄 App.tsx             # Main component
│   ├── 📁 components/
│   │   ├── SplashScreen.tsx   # Animated splash
│   │   └── LoanForm.tsx       # Application form
│   └── 📁 utils/
│       └── telegram.ts        # Telegram integration
└── 📁 public/
    └── vite.svg              # App icon
```

---

## Tech Stack Summary ⚡

- ⚛️ **React 19** - Latest React with new features
- ⚡ **Vite 6** - Super fast build tool
- 📘 **TypeScript** - Type-safe code
- 🎨 **Tailwind CSS** - Utility-first styling (CDN)
- 🎭 **Font Awesome** - Beautiful icons
- 🔤 **Roboto Font** - Google Fonts
- 🤖 **Telegram Bot API** - Form submissions
- 🌐 **Netlify** - Production hosting

---

## What's Next? 🎯

- ✅ Customize colors and branding
- ✅ Add more form fields (optional)
- ✅ Set up custom domain on Netlify
- ✅ Add analytics (Google Analytics)
- ✅ Implement form validation
- ✅ Add loading states
- ✅ Create admin dashboard

---

## Support & Resources 💡

- **React 19:** https://react.dev/
- **Vite 6:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Telegram Bots:** https://core.telegram.org/bots
- **Netlify:** https://docs.netlify.com/

---

**Happy Coding! 🚀**

Made with ❤️ for EcoCash
