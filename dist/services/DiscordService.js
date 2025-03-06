"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordService = void 0;
const axios_1 = __importDefault(require("axios"));
const BaseNotificationService_1 = require("./BaseNotificationService");
class DiscordService extends BaseNotificationService_1.BaseNotificationService {
    async send(message) {
        try {
            if (!this.config.host || !this.config.password) {
                throw new Error('Missing host or username in Discord config');
            }
            const webhookUrl = `https://discord.com/api/webhooks/${this.config.host}/${this.config.password}`;
            const payload = {
                content: message.message,
                username: this.config.username,
                embeds: message.title ? [{
                        title: message.title,
                        description: message.message,
                        color: message.priority === 'high' ? 0xFF0000 :
                            message.priority === 'low' ? 0x00FF00 :
                                0xFFFF00
                    }] : undefined
            };
            await axios_1.default.post(webhookUrl, payload);
            return this.createResult(true, 'discord', 'Message sent successfully');
        }
        catch (error) {
            return this.createResult(false, 'discord', undefined, error);
        }
    }
}
exports.DiscordService = DiscordService;
