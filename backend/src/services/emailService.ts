import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../config/environment.js';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT,
      secure: env.EMAIL_SECURE,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<boolean> {
    try {
      const mailOptions = {
        from: env.EMAIL_FROM,
        to: env.EMAIL_TO,
        subject: `🔔 New Contact Form Submission from ${data.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #667eea; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #667eea; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>💼 New Contact Form Submission</h2>
                <p>You have received a new message from your portfolio website</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${data.name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="field">
                  <div class="label">🕐 Received:</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from exocriador.dev contact form</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to send email notification:', error);
      return false;
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✅ Email service is ready');
      return true;
    } catch (error) {
      console.error('❌ Email service verification failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
