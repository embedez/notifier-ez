import axios from 'axios';
import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';

export class GotifyService extends BaseNotificationService {
  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      if (!this.config.token) {
        throw new Error('Gotify token is required');
      }

      if (!this.config.host) {
        throw new Error('Gotify host is required');
      }

      const baseUrl = `https://${this.config.host}`;
      
      const payload = {
        title: message.title || 'Notification',
        message: message.message,
        priority: message.priority === 'high' ? 8 :
                 message.priority === 'low' ? 3 : 5
      };

      await axios.post(
        `${baseUrl}/message`,
        payload,
        {
          headers: {
            'X-Gotify-Key': this.config.token
          }
        }
      );

      return this.createResult(true, 'gotify', 'Message sent successfully');
    } catch (error) {
      return this.createResult(false, 'gotify', undefined, error as Error);
    }
  }
}