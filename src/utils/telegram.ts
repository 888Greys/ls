interface FormData {
  name: string
  phone: string
  amount: string
  duration: string
}

export const sendToTelegram = async (data: FormData): Promise<void> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    throw new Error('Telegram configuration is missing. Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file.')
  }

  const message = `
🎯 New Loan Application - EcoCash

👤 Name: ${data.name}
📱 Phone: ${data.phone}
💰 Amount: $${data.amount}
📅 Duration: ${data.duration} month(s)

📍 Submitted: ${new Date().toLocaleString()}
  `.trim()

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Telegram API error: ${error.description || 'Unknown error'}`)
  }

  return await response.json()
}
