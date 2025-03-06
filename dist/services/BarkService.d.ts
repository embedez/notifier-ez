import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';
export declare class BarkService extends BaseNotificationService {
    send(message: NotificationMessage): Promise<NotificationResult>;
}
