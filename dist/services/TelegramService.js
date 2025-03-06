"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const axios_1 = __importDefault(require("axios"));
const BaseNotificationService_1 = require("./BaseNotificationService");
class TelegramService extends BaseNotificationService_1.BaseNotificationService {
    async send(message) {
        var _a;
        try {
            console.log(this.config);
            if (!this.config.password) {
                throw new Error("Telegram bot token is required");
            }
            if (!((_a = this.config.additionalParams) === null || _a === void 0 ? void 0 : _a.to)) {
                throw new Error("Telegram chat ID or channel is required");
            }
            const baseUrl = "https://api.telegram.org";
            const chats = Array.isArray(this.config.additionalParams.to)
                ? this.config.additionalParams.to
                : [this.config.additionalParams.to];
            const payload = {
                text: message.title
                    ? `*${message.title}*\n${message.message}`
                    : message.message,
                parse_mode: "Markdown",
                disable_web_page_preview: true,
            };
            // Send to all specified chats
            await Promise.all(chats.map((chat) => {
                return axios_1.default.post(`${baseUrl}/bot${this.config.password}/sendMessage`, { ...payload, chat_id: chat });
            }));
            return this.createResult(true, "telegram", "Message sent successfully");
        }
        catch (error) {
            return this.createResult(false, "telegram", undefined, error);
        }
    }
}
exports.TelegramService = TelegramService;
