# Telegram Notifier Bot

Telegram bot for receiving notifications about contact form submissions from exocriador.dev portfolio website.

## Setup Instructions

### 1. Create a New Telegram Bot

1. Open Telegram and find [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the instructions:
   - Choose a name (e.g., "ExoCriador Portfolio Notifier")
   - Choose a username (e.g., `exocriador_portfolio_bot`)
4. Copy the bot token provided by BotFather

### 2. Get Your Chat ID

1. Start a conversation with your new bot (send `/start`)
2. Visit this URL in your browser (replace `<YOUR_BOT_TOKEN>` with your actual token):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. Look for `"chat":{"id":123456789}` in the response
4. Copy the chat ID number

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   PORT=3002
   TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
   TELEGRAM_CHAT_ID=your_chat_id_from_getupdates
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Bot

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### POST /notify

Send a contact form notification.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I'd like to discuss a project.",
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification sent successfully"
}
```

### GET /health

Check if the bot is running.

**Response:**
```json
{
  "success": true,
  "message": "Telegram notifier bot is running",
  "timestamp": "2024-01-15T12:00:00Z"
}
```

## Docker Support

Build and run with Docker:
```bash
docker build -t telegram-notifier-bot .
docker run -p 3002:3002 --env-file .env telegram-notifier-bot
```

## Troubleshooting

### Bot not sending messages

1. Check that your bot token is correct
2. Verify your chat ID is correct
3. Make sure you've sent at least one message to the bot (send `/start`)
4. Check the logs for error messages

### "Chat not found" error

This means you haven't started a conversation with your bot yet. Send `/start` to your bot in Telegram first.

## License

MIT
