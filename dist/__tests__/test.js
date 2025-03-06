"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const testMessages = {
    low: {
        title: "Low Priority Test",
        message: "This is a low priority test message",
        priority: "low",
    },
    normal: {
        title: "Normal Priority Test",
        message: "This is a normal priority test message",
        priority: "normal",
    },
    high: {
        title: "High Priority Test",
        message: "This is a high priority test message",
        priority: "high",
    }
};
async function testNotificationService(serviceName, url) {
    if (!url) {
        console.log(`Skipping ${serviceName} test: No URL provided`);
        return;
    }
    console.log(`Testing ${serviceName}...`);
    const service = (0, src_1.createNotifier)(url);
    try {
        // Test with different priority messages
        await service.send(testMessages.low);
        console.log(`${serviceName}: Low priority message sent`);
        await service.send(testMessages.normal);
        console.log(`${serviceName}: Normal priority message sent`);
        await service.send(testMessages.high);
        console.log(`${serviceName}: High priority message sent`);
    }
    catch (error) {
        console.error(`${serviceName} Error:`, error);
    }
}
// Run tests for all services
testNotificationService('Discord', process.env.DISCORD_WEBHOOK);
testNotificationService('Telegram', process.env.TELEGRAM_WEBHOOK);
//testNotificationService('Slack', process.env.SLACK_WEBHOOK);
//testNotificationService('Gotify', process.env.GOTIFY_WEBHOOK);
//testNotificationService('Bark', process.env.BARK_WEBHOOK);
testNotificationService('Email', process.env.SMTP_WEBHOOK);
