import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Contact form validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message cannot exceed 5000 characters')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Validation middleware
export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const validatedData = contactSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
      return;
    }
    next(error);
  }
};
