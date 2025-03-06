export interface NotificationConfig {
  platform: string;
  host?: string;
  token?: string;
  username?: string;
  password?: string;
  port?: number;
  deviceKey?: string;
  channel?: string | string[];
  recipients?: string[];
  additionalParams?: Record<string, string | string[]>;
}

export interface NotificationMessage {
  title?: string;
  message: string;
  priority?: 'low' | 'normal' | 'high';
  [key: string]: any;
}

export interface NotificationResult {
  success: boolean;
  message?: string;
  error?: Error;
  timestamp: Date;
  platform: string;
}

export interface NotificationService {
  send(message: NotificationMessage): Promise<NotificationResult>;
  parseUrl(url: string): NotificationConfig;
}