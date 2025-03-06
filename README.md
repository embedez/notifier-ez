# Notifier EZ

A unified notification service that supports multiple platforms including Discord, Telegram, Slack, Gotify, Bark, and SMTP email.

## Usage

```typescript
import { createNotifier } from "notifier-ez";

// Create a Discord notifier instance
let notifier = createNotifier(
  "discord://CustomUsername:YOUR-WEBHOOK-TOKEN@CHANNEL-ID"
);

// Send notifications
notifier.send({
  title: "CPU Usage Alert",
  message: "CPU usage exceeded 90%",
  priority: "high",
});

// create a smtp notification
notifier = createNotifier(
  "smtp://username:password@host:port?from=fromAddress&to=toAddress,toAddress"
);

notifier.send({
  title: "System Update",
  message: "Deployment completed successfully",
  priority: "normal",
});

notifier.send({
  title: "Daily Report",
  message: "All systems operational",
  priority: "low",
});
```

## Configuration

Pass any of these url formats into the notifier, and the notifier will automatically detect the service type.

### Discord

```properties
discord://username:webhook-token@channel-id
```

- `username`: Your custom username for the webhook
- `webhook-token`: The token part from your Discord webhook URL
- `channel-id`: Your Discord channel ID

### Telegram

```properties
telegram://:bot-token@chat-id
```

- `bot-token`: Your Telegram bot token URL encoded
- `chat-id`: Your chat ID (can be group or individual)

### Slack

```properties
slack://token@webhook-id
```

- Format: `T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`

### Gotify

```properties
gotify://hostname:port/token
```

- `hostname`: Your Gotify server hostname
- `port`: Server port (optional)
- `token`: Your Gotify application token

### Bark

```properties
bark://device-key@server
```

- `device-key`: Your Bark device key
- `server`: Bark server (default: api.day.app)

### SMTP (Email)

```properties
smtp://username:password@host:port?from=fromAddress&to=toAddress1,toAddress2
```

- `username`: SMTP username
- `password`: SMTP password
- `host`: SMTP server hostname
- `port`: SMTP port (usually 465 for SSL)
- `from`: Sender email address
- `to`: Recipient email address(es), comma-separated
