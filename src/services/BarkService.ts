import axios from 'axios';
import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';

export class BarkService extends BaseNotificationService {
  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      if (!this.config.deviceKey) {
        throw new Error('Bark device key is required');
      }

      if (!this.config.host) {
        throw new Error('Bark host is required');
      }

      const baseUrl = `https://${this.config.host}`;
      
      const payload = {
        title: message.title || 'Notification',
        body: message.message,
        level: message.priority === 'high' ? 'timeSensitive' :
               message.priority === 'low' ? 'passive' : 'active'
      };

      await axios.post(
        `${baseUrl}/${this.config.deviceKey}`,
        payload
      );

      return this.createResult(true, 'bark', 'Message sent successfully');
    } catch (error) {
      return this.createResult(false, 'bark', undefined, error as Error);
    }
  }
}