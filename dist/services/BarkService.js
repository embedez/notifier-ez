"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarkService = void 0;
const axios_1 = __importDefault(require("axios"));
const BaseNotificationService_1 = require("./BaseNotificationService");
class BarkService extends BaseNotificationService_1.BaseNotificationService {
    async send(message) {
        try {
            if (!this.config.deviceKey) {
                throw new Error('Bark device key is required');
            }
            if (!this.config.host) {
                throw new Error('Bark host is required');
            }
            const baseUrl = `https://${this.config.host}`;
            const payload = {
                title: message.title || 'Notification',
                body: message.message,
                level: message.priority === 'high' ? 'timeSensitive' :
                    message.priority === 'low' ? 'passive' : 'active'
            };
            await axios_1.default.post(`${baseUrl}/${this.config.deviceKey}`, payload);
            return this.createResult(true, 'bark', 'Message sent successfully');
        }
        catch (error) {
            return this.createResult(false, 'bark', undefined, error);
        }
    }
}
exports.BarkService = BarkService;
