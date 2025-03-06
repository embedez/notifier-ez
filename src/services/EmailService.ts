import nodemailer from 'nodemailer';
import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';

export class EmailService extends BaseNotificationService {
  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      if (!this.config.host) {
        throw new Error('SMTP host is required');
      }

      if (!this.config.username || !this.config.password) {
        throw new Error('SMTP credentials are required');
      }

      if (!this.config.additionalParams?.from) {
        throw new Error('Sender email address is required');
      }

      if (!this.config.additionalParams?.to) {
        throw new Error('Recipient email address is required');
      }

      const transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port || 587,
        secure: this.config.port === 465,
        auth: {
          user: this.config.username,
          pass: this.config.password
        }
      });

      const recipients = Array.isArray(this.config.additionalParams.to) ?
        this.config.additionalParams.to.join(',') :
        this.config.additionalParams.to;

      const mailOptions = {
        from: this.config.additionalParams.from as string,
        to: recipients,
        subject: message.title || 'Notification',
        text: message.message
      };

      await transporter.sendMail(mailOptions);

      return this.createResult(true, 'email', 'Email sent successfully');
    } catch (error) {
      return this.createResult(false, 'email', undefined, error as Error);
    }
  }
}