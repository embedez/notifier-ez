import { NotificationMessage, NotificationResult } from "../types";
import { BaseNotificationService } from "./BaseNotificationService";
export declare class TelegramService extends BaseNotificationService {
    send(message: NotificationMessage): Promise<NotificationResult>;
}
