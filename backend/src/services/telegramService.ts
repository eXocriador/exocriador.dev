import { env } from '../config/environment.js';

class TelegramService {
  private notifierUrl: string;

  constructor() {
    this.notifierUrl = env.TELEGRAM_NOTIFIER_URL;
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(this.notifierUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('✅ Telegram notification sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to send Telegram notification:', error);
      return false;
    }
  }
}

export const telegramService = new TelegramService();
