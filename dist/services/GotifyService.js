"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GotifyService = void 0;
const axios_1 = __importDefault(require("axios"));
const BaseNotificationService_1 = require("./BaseNotificationService");
class GotifyService extends BaseNotificationService_1.BaseNotificationService {
    async send(message) {
        try {
            if (!this.config.token) {
                throw new Error('Gotify token is required');
            }
            if (!this.config.host) {
                throw new Error('Gotify host is required');
            }
            const baseUrl = `https://${this.config.host}`;
            const payload = {
                title: message.title || 'Notification',
                message: message.message,
                priority: message.priority === 'high' ? 8 :
                    message.priority === 'low' ? 3 : 5
            };
            await axios_1.default.post(`${baseUrl}/message`, payload, {
                headers: {
                    'X-Gotify-Key': this.config.token
                }
            });
            return this.createResult(true, 'gotify', 'Message sent successfully');
        }
        catch (error) {
            return this.createResult(false, 'gotify', undefined, error);
        }
    }
}
exports.GotifyService = GotifyService;
