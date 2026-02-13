import express, { Request, Response } from 'express';
import { env } from './config/environment.js';
import { initBot } from './bot.js';
import { sendContactNotification } from './handlers/notifications.js';

const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Telegram notifier bot is running',
    timestamp: new Date().toISOString(),
  });
});

// Notification endpoint
app.post('/notify', async (req: Request, res: Response) => {
  try {
    const { name, email, message, timestamp } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, message',
      });
      return;
    }

    // Send notification
    await sendContactNotification({
      name,
      email,
      message,
      timestamp: timestamp || new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: 'Notification sent successfully',
    });
  } catch (error) {
    console.error('❌ Error handling notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send notification',
    });
  }
});

// Start server
const startServer = async () => {
  try {
    // Initialize bot
    await initBot();

    // Start listening
    app.listen(env.PORT, () => {
      console.log('');
      console.log('🤖 ========================================');
      console.log(`🤖 Telegram Notifier Bot running on port ${env.PORT}`);
      console.log(`🤖 Chat ID: ${env.TELEGRAM_CHAT_ID}`);
      console.log('🤖 ========================================');
      console.log('');
      console.log('📝 Endpoints:');
      console.log(`   GET  http://localhost:${env.PORT}/health`);
      console.log(`   POST http://localhost:${env.PORT}/notify`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to start Telegram notifier bot:', error);
    process.exit(1);
  }
};

startServer();
