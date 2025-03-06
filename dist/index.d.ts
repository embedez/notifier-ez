import { NotificationConfig, NotificationMessage, NotificationResult, NotificationService } from './types';
import { DiscordService } from './services/DiscordService';
import { TelegramService } from './services/TelegramService';
import { SlackService } from './services/SlackService';
import { GotifyService } from './services/GotifyService';
import { BarkService } from './services/BarkService';
export type { NotificationConfig, NotificationMessage, NotificationResult, NotificationService };
export { DiscordService, TelegramService, SlackService, GotifyService, BarkService };
export declare function createNotifier(url: string): NotificationService;
