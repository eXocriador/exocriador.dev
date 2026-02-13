import { config } from 'dotenv';

// Load environment variables
config();

interface Environment {
  PORT: number;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

// Validate environment variables
const validateEnv = (): Environment => {
  const { PORT, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is required. Get it from @BotFather');
  }

  if (!TELEGRAM_CHAT_ID) {
    throw new Error('TELEGRAM_CHAT_ID is required. Get it by messaging your bot and checking /getUpdates');
  }

  return {
    PORT: PORT ? parseInt(PORT, 10) : 3002,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
  };
};

export const env = validateEnv();
