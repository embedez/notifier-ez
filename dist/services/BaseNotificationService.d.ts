import { NotificationConfig, NotificationMessage, NotificationResult, NotificationService } from '../types';
export declare abstract class BaseNotificationService implements NotificationService {
    protected config: NotificationConfig;
    constructor(config: NotificationConfig);
    abstract send(message: NotificationMessage): Promise<NotificationResult>;
    parseUrl(url: string): NotificationConfig;
    protected createResult(success: boolean, platform: string, message?: string, error?: Error): NotificationResult;
}
