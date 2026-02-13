import express, { Request, Response } from 'express';
import { env, isDevelopment } from './config/environment.js';
import { connectDatabase } from './config/database.js';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { emailService } from './services/emailService.js';
import contactRoutes from './routes/contact.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/contact', contactRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Verify email service
    await emailService.verifyConnection();

    // Start listening
    app.listen(env.PORT, () => {
      console.log('');
      console.log('🚀 ========================================');
      console.log(`🚀 Server running on port ${env.PORT}`);
      console.log(`🚀 Environment: ${env.NODE_ENV}`);
      console.log(`🚀 Frontend URL: ${env.FRONTEND_URL}`);
      console.log('🚀 ========================================');
      console.log('');

      if (isDevelopment) {
        console.log('📝 API Endpoints:');
        console.log(`   GET  http://localhost:${env.PORT}/api/health`);
        console.log(`   POST http://localhost:${env.PORT}/api/contact`);
        console.log('');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
