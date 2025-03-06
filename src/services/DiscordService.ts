import axios from 'axios';
import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';

export class DiscordService extends BaseNotificationService {
  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      if (!this.config.host || !this.config.password) {
        throw new Error('Missing host or username in Discord config');
      }

      const webhookUrl = `https://discord.com/api/webhooks/${this.config.host}/${this.config.password}`;

      const payload = {
        content: message.message,
        username: this.config.username,
        embeds: message.title ? [{
          title: message.title,
          description: message.message,
          color: message.priority === 'high' ? 0xFF0000 : 
                 message.priority === 'low' ? 0x00FF00 : 
                 0xFFFF00
        }] : undefined
      };

      await axios.post(webhookUrl, payload);

      return this.createResult(true, 'discord', 'Message sent successfully');
    } catch (error) {
      return this.createResult(false, 'discord', undefined, error as Error);
    }
  }
}