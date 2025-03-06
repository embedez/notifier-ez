"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarkService = exports.GotifyService = exports.SlackService = exports.TelegramService = exports.DiscordService = void 0;
exports.createNotifier = createNotifier;
const DiscordService_1 = require("./services/DiscordService");
Object.defineProperty(exports, "DiscordService", { enumerable: true, get: function () { return DiscordService_1.DiscordService; } });
const TelegramService_1 = require("./services/TelegramService");
Object.defineProperty(exports, "TelegramService", { enumerable: true, get: function () { return TelegramService_1.TelegramService; } });
const SlackService_1 = require("./services/SlackService");
Object.defineProperty(exports, "SlackService", { enumerable: true, get: function () { return SlackService_1.SlackService; } });
const GotifyService_1 = require("./services/GotifyService");
Object.defineProperty(exports, "GotifyService", { enumerable: true, get: function () { return GotifyService_1.GotifyService; } });
const BarkService_1 = require("./services/BarkService");
Object.defineProperty(exports, "BarkService", { enumerable: true, get: function () { return BarkService_1.BarkService; } });
const EmailService_1 = require("./services/EmailService");
function createNotifier(url) {
    const parsedUrl = new URL(url);
    const platform = parsedUrl.protocol.replace(':', '');
    let service;
    switch (platform) {
        case 'discord':
            service = new DiscordService_1.DiscordService(new DiscordService_1.DiscordService({}).parseUrl(url));
            break;
        case 'telegram':
            service = new TelegramService_1.TelegramService(new TelegramService_1.TelegramService({}).parseUrl(url));
            break;
        case 'slack':
            service = new SlackService_1.SlackService(new SlackService_1.SlackService({}).parseUrl(url));
            break;
        case 'gotify':
            service = new GotifyService_1.GotifyService(new GotifyService_1.GotifyService({}).parseUrl(url));
            break;
        case 'bark':
            service = new BarkService_1.BarkService(new BarkService_1.BarkService({}).parseUrl(url));
            break;
        case 'smtp':
            service = new EmailService_1.EmailService(new EmailService_1.EmailService({}).parseUrl(url));
            break;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
    return service;
}
