import { Router, Request, Response } from 'express';
import { validateContactForm, ContactFormData } from '../middleware/validation.js';
import { Contact } from '../models/Contact.js';
import { emailService } from '../services/emailService.js';
import { telegramService } from '../services/telegramService.js';

const router = Router();

// POST /api/contact - Submit contact form
router.post('/', validateContactForm, async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body as ContactFormData;

    // Save to database
    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();
    console.log('✅ Contact saved to database:', contact._id);

    // Send notifications asynchronously (don't block response)
    Promise.all([
      emailService.sendContactNotification({ name, email, message })
        .then(success => {
          if (success) {
            contact.emailSent = true;
            contact.save().catch(err => console.error('Failed to update emailSent:', err));
          }
        }),
      telegramService.sendContactNotification({ name, email, message })
        .then(success => {
          if (success) {
            contact.notificationSent = true;
            contact.save().catch(err => console.error('Failed to update notificationSent:', err));
          }
        }),
    ]).catch(error => {
      console.error('❌ Error sending notifications:', error);
    });

    // Respond immediately to user
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your request. Please try again later.',
    });
  }
});

export default router;
