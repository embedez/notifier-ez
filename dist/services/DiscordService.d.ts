import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';
export declare class DiscordService extends BaseNotificationService {
    send(message: NotificationMessage): Promise<NotificationResult>;
}
