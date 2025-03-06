import { NotificationConfig, NotificationMessage, NotificationResult, NotificationService } from '../types';

export abstract class BaseNotificationService implements NotificationService {
  protected config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
  }

  abstract send(message: NotificationMessage): Promise<NotificationResult>;

  parseUrl(url: string): NotificationConfig {
    const parsedUrl = new URL(url);
    const platform = parsedUrl.protocol.replace(':', '');
    
    const config: NotificationConfig = {
      platform,
      host: parsedUrl.hostname || undefined,
      port: parsedUrl.port ? parseInt(parsedUrl.port, 10) : undefined
    };

    // Parse authentication
    if (parsedUrl.username) {
      config.username = decodeURIComponent(parsedUrl.username);
    }
    if (parsedUrl.password) {
      config.password = decodeURIComponent(parsedUrl.password);
    }

    // Parse query parameters
    const queryParams: Record<string, string | string[]> = {};
    parsedUrl.searchParams.forEach((value, key) => {
      if (key === 'to' || key === 'devices' || key === 'chats' || key === 'rooms') {
        queryParams[key] = value.split(',').map(item => item.trim());
      } else {
        queryParams[key] = value;
      }
    });

    if (Object.keys(queryParams).length > 0) {
      config.additionalParams = queryParams;
    }

    return config;
  }

  protected createResult(success: boolean, platform: string, message?: string, error?: Error): NotificationResult {
    return {
      success,
      message,
      error,
      timestamp: new Date(),
      platform
    };
  }
}