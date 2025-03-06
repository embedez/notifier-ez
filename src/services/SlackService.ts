import axios from 'axios';
import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';

export class SlackService extends BaseNotificationService {
  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      if (!this.config.token) {
        throw new Error('Slack webhook tokens are required');
      }

      // Parse the three-part token (token-a/token-b/token-c)
      const [tokenA, tokenB, tokenC] = this.config.token.split('/');
      if (!tokenA || !tokenB || !tokenC) {
        throw new Error('Invalid Slack webhook token format');
      }

      const webhookUrl = `https://hooks.slack.com/services/${tokenA}/${tokenB}/${tokenC}`;

      const payload = {
        text: message.message,
        username: this.config.username,
        blocks: message.title ? [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: message.title
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: message.message
            }
          }
        ] : undefined
      };

      await axios.post(webhookUrl, payload);

      return this.createResult(true, 'slack', 'Message sent successfully');
    } catch (error) {
      return this.createResult(false, 'slack', undefined, error as Error);
    }
  }
}