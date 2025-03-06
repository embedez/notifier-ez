import axios from "axios";
import { NotificationMessage, NotificationResult } from "../types";
import { BaseNotificationService } from "./BaseNotificationService";

export class TelegramService extends BaseNotificationService {
  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      console.log(this.config);
      if (!this.config.password) {
        throw new Error("Telegram bot token is required");
      }

      if (!this.config.additionalParams?.to) {
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
      await Promise.all(
        chats.map((chat) => {
          return axios.post(
            `${baseUrl}/bot${this.config.password}/sendMessage`,
            { ...payload, chat_id: chat }
          );
        })
      );

      return this.createResult(true, "telegram", "Message sent successfully");
    } catch (error) {
      return this.createResult(false, "telegram", undefined, error as Error);
    }
  }
}
