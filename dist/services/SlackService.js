"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
const axios_1 = __importDefault(require("axios"));
const BaseNotificationService_1 = require("./BaseNotificationService");
class SlackService extends BaseNotificationService_1.BaseNotificationService {
    async send(message) {
        try {
            if (!this.config.token) {
                throw new Error('Slack webhook tokens are required');
            }
            // Parse the three-part token (token-a/token-b/token-c)
            const [tokenA, tokenB, tokenC] = this.config.token.split('/');
            if (!tokenA || !tokenB || !tokenC) {
                throw new Error('Invalid Slack webhook token format');
            }
            const webhookUrl = `https://hooks.slack.com/services/${tokenA}/${tokenB}/${tokenC}`;
            const payload = {
                text: message.message,
                username: this.config.username,
                blocks: message.title ? [
                    {
                        type: 'header',
                        text: {
                            type: 'plain_text',
                            text: message.title
                        }
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: message.message
                        }
                    }
                ] : undefined
            };
            await axios_1.default.post(webhookUrl, payload);
            return this.createResult(true, 'slack', 'Message sent successfully');
        }
        catch (error) {
            return this.createResult(false, 'slack', undefined, error);
        }
    }
}
exports.SlackService = SlackService;
