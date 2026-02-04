# EcoCash Lesotho - Kadimo ea Potlako 💰

A modern loan application platform built with React 19, Vite 6, and TypeScript, featuring bilingual support (Sesotho/English) and seamless Telegram integration for Lesotho market.

## 🚀 Tech Stack

### Frontend Framework
- **React 19**: Core UI library with latest features
- **Vite 6**: Lightning-fast build tool and dev server
- **TypeScript**: Type-safe code for better development experience

### Styling
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Font Awesome**: Beautiful icons for UI elements
- **Google Fonts**: Roboto font family for consistent typography

### Deployment & Backend
- **Netlify**: Modern hosting platform with continuous deployment
- **Telegram Bot API**: Direct client-side integration for form submissions (no traditional backend required)

## ✨ Key Features

- 🎨 Beautiful animated splash screen with canvas graphics
- 🌍 **Bilingual support**: Sesotho (primary) and English
- 📱 Fully responsive design for all devices
- 🔐 Multi-step verification: Loan Form → Login → OTP → Submission
- 🔒 Secure form submission via Telegram Bot API
- ⚡ Fast loading and optimized performance
- 🎯 Type-safe code with TypeScript
- 🌐 Single Page Application (SPA) architecture
- 💱� User Journey

1. **Splash Screen** (3 seconds) - "Kadimo - Lesotho"
2. **Loan Application Form** - Fill details in Sesotho/English
3. **Login Page** - Enter phone number and PIN
## 📋 Prerequisitesication
5. **Success Page** - Application submitted confirmation

Application data is sent to Telegram only after successful OTP verification.sotho Loti (LSL)
- 📞 Phone format for Lesotho (+266)

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Setup Instructions

### 1. Clone the repository (or navigate to the project folder)

```bash
cd ecocashloan
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Telegram Bot

#### Create a Telegram Bot:
1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the **Bot Token** provided

#### Get your Chat ID:
1. Start a chat with your new bot
2. Send any message to the bot
3. Open: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for `"chat":{"id":` in the response
5. Copy your **Chat ID**

### 4. Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Telegram credentials:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

### 5. Run Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🌐 Deploy to Netlify

### Option 1: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 2: Deploy via Netlify Dashboard

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Add environment variables in Netlify dashboard:
   - `VITE_TELEGRAM_BOT_TOKEN`
   - `VITE_TELEGRAM_CHAT_ID`
6. Click "Deploy site"

### Option 3: Drag & Drop

1. Build the project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder
4. Add environment variables in site settings

## 📁 Project Structure

```
ecocashloan/
├── src/
│   ├── components/
│   │   ├── SplashScreen.tsx    # Animated splash screen
│   │   └── LoanForm.tsx         # Loan application form
│   ├── utils/
│   │   └── telegram.ts          # Telegram API integration
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts            # Vite type declarations
├── index.html                   # HTML template with CDN links
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── netlify.toml                 # Netlify deployment config
├── package.json                 # Dependencies
└── .env.example                 # Environment variables template
```

## 🎨 Customization

### Update Colors
The color scheme can be modified in the components:
- Primary gradient: `from-purple-600 to-indigo-600`
- EcoCash red: `#e11d2d`
- Background: Custom radial gradient

### Modify Splash Duration
In [src/App.tsx](src/App.tsx), change the timeout value:
```typescript
setTimeout(() => setShowSplash(false), 3000) // 3 seconds
```

### Add More Form Fields
Edit [src/components/LoanForm.tsx](src/components/LoanForm.tsx) and update the FormData interface.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TELEGRAM_BOT_TOKEN` | Your Telegram bot token from @BotFather | Yes |
| `VITE_TELEGRAM_CHAT_ID` | Your Telegram chat ID | Yes |

## 🤝 Support

For issues or questions:
1. Check the [documentation](https://vitejs.dev/)
2. Review [React 19 docs](https://react.dev/)
3. Telegram Bot API [documentation](https://core.telegram.org/bots/api)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team for React 19Lesotho - Kadimo ea Potlak
- Vite Team for Vite 6
- Tailwind CSS for the amazing framework
- Font Awesome for the icons
- Netlify for hosting

---

Made with ❤️ for EcoCash Spache - Fono
