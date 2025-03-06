"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNotificationService = void 0;
class BaseNotificationService {
    constructor(config) {
        this.config = config;
    }
    parseUrl(url) {
        const parsedUrl = new URL(url);
        const platform = parsedUrl.protocol.replace(':', '');
        const config = {
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
        const queryParams = {};
        parsedUrl.searchParams.forEach((value, key) => {
            if (key === 'to' || key === 'devices' || key === 'chats' || key === 'rooms') {
                queryParams[key] = value.split(',').map(item => item.trim());
            }
            else {
                queryParams[key] = value;
            }
        });
        if (Object.keys(queryParams).length > 0) {
            config.additionalParams = queryParams;
        }
        return config;
    }
    createResult(success, platform, message, error) {
        return {
            success,
            message,
            error,
            timestamp: new Date(),
            platform
        };
    }
}
exports.BaseNotificationService = BaseNotificationService;
