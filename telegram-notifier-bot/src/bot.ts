import TelegramBot from 'node-telegram-bot-api';
import { env } from './config/environment.js';

// Create bot instance
export const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, {
  polling: false, // We'll use webhooks or manual sendMessage
});

// Initialize bot
export const initBot = async (): Promise<void> => {
  try {
    const me = await bot.getMe();
    console.log('✅ Telegram bot initialized successfully');
    console.log(`   Bot name: ${me.first_name}`);
    console.log(`   Bot username: @${me.username}`);
  } catch (error) {
    console.error('❌ Failed to initialize Telegram bot:', error);
    throw error;
  }
};
