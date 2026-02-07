import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: import.meta.env.VITE_UPSTASH_REDIS_URL,
  token: import.meta.env.VITE_UPSTASH_REDIS_TOKEN,
})

// Bot configurations
export interface BotConfig {
  token: string
  chatId: string
  name: string
}

const PRIMARY_BOT: BotConfig = {
  token: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID,
  name: 'PRIMARY'
}

const SECONDARY_BOT: BotConfig = {
  token: import.meta.env.VITE_TELEGRAM_BOT_TOKEN_2,
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID_2,
  name: 'SECONDARY'
}

const COUNTER_KEY = 'user_counter'

/**
 * Gets the next bot to route traffic to.
 * Every 4th user goes to SECONDARY bot, others go to PRIMARY.
 * Uses Redis INCR for atomic counter management.
 * Stores the bot assignment for this phone number for subsequent messages.
 */
export async function getNextBot(phoneNumber: string): Promise<BotConfig> {
  try {
    // Check if this phone number already has a bot assigned
    const existingBot = getStoredBot(phoneNumber)
    if (existingBot) {
      console.log(`🔄 User ${phoneNumber} → ${existingBot.name} BOT (stored)`)
      return existingBot
    }

    // Atomically increment counter in Redis
    const counter = await redis.incr(COUNTER_KEY)
    
    // Every 4th user goes to secondary bot
    const useSecondary = counter % 4 === 0
    const selectedBot = useSecondary ? SECONDARY_BOT : PRIMARY_BOT
    
    // Store bot assignment for this phone number
    storeBotAssignment(phoneNumber, selectedBot)
    
    console.log(`🎯 User #${counter} (${phoneNumber}) → ${selectedBot.name} BOT`)
    
    return selectedBot
  } catch (error) {
    console.error('Redis routing error:', error)
    // Fallback to primary bot if Redis fails
    console.warn('⚠️ Falling back to PRIMARY BOT')
    return PRIMARY_BOT
  }
}

/**
 * Store bot assignment for a phone number in sessionStorage
 */
function storeBotAssignment(phoneNumber: string, bot: BotConfig): void {
  try {
    sessionStorage.setItem(`bot_${phoneNumber}`, bot.name)
  } catch (error) {
    console.error('Storage error:', error)
  }
}

/**
 * Get stored bot assignment for a phone number
 */
function getStoredBot(phoneNumber: string): BotConfig | null {
  try {
    const botName = sessionStorage.getItem(`bot_${phoneNumber}`)
    if (botName === 'SECONDARY') return SECONDARY_BOT
    if (botName === 'PRIMARY') return PRIMARY_BOT
    return null
  } catch (error) {
    console.error('Storage retrieval error:', error)
    return null
  }
}

/**
 * Get current counter value (for debugging/monitoring)
 */
export async function getCurrentCount(): Promise<number> {
  try {
    const count = await redis.get<number>(COUNTER_KEY)
    return count || 0
  } catch (error) {
    console.error('Redis get count error:', error)
    return 0
  }
}

/**
 * Reset counter (admin function - use with caution)
 */
export async function resetCounter(): Promise<void> {
  try {
    await redis.set(COUNTER_KEY, 0)
    console.log('✅ Counter reset to 0')
  } catch (error) {
    console.error('Redis reset error:', error)
  }
}
