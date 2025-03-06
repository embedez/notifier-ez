import { NotificationMessage, NotificationResult } from '../types';
import { BaseNotificationService } from './BaseNotificationService';
export declare class EmailService extends BaseNotificationService {
    send(message: NotificationMessage): Promise<NotificationResult>;
}
