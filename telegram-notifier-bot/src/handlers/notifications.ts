import { bot } from '../bot.js';
import { env } from '../config/environment.js';

interface ContactNotification {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export const sendContactNotification = async (
  data: ContactNotification
): Promise<void> => {
  const formattedMessage = `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> <code>${escapeHtml(data.email)}</code>

💬 <b>Message:</b>
${escapeHtml(data.message)}

🕐 <b>Received:</b> ${new Date(data.timestamp).toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'short',
    timeStyle: 'short',
  })}

📝 Reply to: ${escapeHtml(data.email)}
  `.trim();

  try {
    await bot.sendMessage(env.TELEGRAM_CHAT_ID, formattedMessage, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
    console.log('✅ Telegram notification sent successfully');
  } catch (error) {
    console.error('❌ Failed to send Telegram notification:', error);
    throw error;
  }
};

// Helper function to escape HTML special characters
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
