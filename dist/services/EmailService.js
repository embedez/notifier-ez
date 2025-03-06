"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const BaseNotificationService_1 = require("./BaseNotificationService");
class EmailService extends BaseNotificationService_1.BaseNotificationService {
    async send(message) {
        var _a, _b;
        try {
            if (!this.config.host) {
                throw new Error('SMTP host is required');
            }
            if (!this.config.username || !this.config.password) {
                throw new Error('SMTP credentials are required');
            }
            if (!((_a = this.config.additionalParams) === null || _a === void 0 ? void 0 : _a.from)) {
                throw new Error('Sender email address is required');
            }
            if (!((_b = this.config.additionalParams) === null || _b === void 0 ? void 0 : _b.to)) {
                throw new Error('Recipient email address is required');
            }
            const transporter = nodemailer_1.default.createTransport({
                host: this.config.host,
                port: this.config.port || 587,
                secure: this.config.port === 465,
                auth: {
                    user: this.config.username,
                    pass: this.config.password
                }
            });
            const recipients = Array.isArray(this.config.additionalParams.to) ?
                this.config.additionalParams.to.join(',') :
                this.config.additionalParams.to;
            const mailOptions = {
                from: this.config.additionalParams.from,
                to: recipients,
                subject: message.title || 'Notification',
                text: message.message
            };
            await transporter.sendMail(mailOptions);
            return this.createResult(true, 'email', 'Email sent successfully');
        }
        catch (error) {
            return this.createResult(false, 'email', undefined, error);
        }
    }
}
exports.EmailService = EmailService;
