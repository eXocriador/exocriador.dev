import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Environment variables schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  FRONTEND_URL: z.string().url(),
  MONGODB_URI: z.string().url(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().transform(Number),
  EMAIL_SECURE: z.string().transform(val => val === 'true').default('false'),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string(),
  EMAIL_FROM: z.string().email(),
  EMAIL_TO: z.string().email(),
  TELEGRAM_NOTIFIER_URL: z.string().url(),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const env = parseEnv();

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
