import { NotificationConfig, NotificationMessage, NotificationResult, NotificationService } from './types';
import { DiscordService } from './services/DiscordService';
import { TelegramService } from './services/TelegramService';
import { SlackService } from './services/SlackService';
import { GotifyService } from './services/GotifyService';
import { BarkService } from './services/BarkService';
import { EmailService } from './services/EmailService';

export type { NotificationConfig, NotificationMessage, NotificationResult, NotificationService };
export { DiscordService, TelegramService, SlackService, GotifyService, BarkService };

export function createNotifier(url: string): NotificationService {
  const parsedUrl = new URL(url);
  const platform = parsedUrl.protocol.replace(':', '');

  let service: NotificationService;

  switch (platform) {
    case 'discord':
      service = new DiscordService(new DiscordService({} as NotificationConfig).parseUrl(url));
      break;
    case 'telegram':
      service = new TelegramService(new TelegramService({} as NotificationConfig).parseUrl(url));
      break;
    case 'slack':
      service = new SlackService(new SlackService({} as NotificationConfig).parseUrl(url));
      break;
    case 'gotify':
      service = new GotifyService(new GotifyService({} as NotificationConfig).parseUrl(url));
      break;
    case 'bark':
      service = new BarkService(new BarkService({} as NotificationConfig).parseUrl(url));
      break;
    case 'smtp':
      service = new EmailService(new EmailService({} as NotificationConfig).parseUrl(url));
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }

  return service;
}