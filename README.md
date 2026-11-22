# NotifiService

A Node.js/Express notification service that sends email notifications using Nodemailer, stores notification records in MongoDB, and processes pending notifications via a scheduled cron job.

## Features

- **Create notifications** - POST endpoint to create a new notification ticket
- **List all notifications** - GET endpoint to fetch all notifications (newest first)
- **Get notification by ID** - GET endpoint to fetch a single notification
- **Update notification status** - PUT endpoint to mark a notification as SUCCESS, FAILED, or PENDING
- **Delete notification** - DELETE endpoint to remove a notification
- **Scheduled email sending** - Cron job runs every 2 minutes to send pending emails via Gmail SMTP

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/notiservice/api/v1/notifications` | Create a new notification ticket |
| GET | `/notiservice/api/v1/notifications` | Get all notifications |
| GET | `/notiservice/api/v1/notifications/:id` | Get a notification by ID |
| PUT | `/notiservice/api/v1/notifications/:id` | Update notification status |
| DELETE | `/notiservice/api/v1/notifications/:id` | Delete a notification |

## Project Structure

```
notificationService/
├── index.js                # Entry point - Express server + MongoDB connection + cron
├── controllers/
│   └── ticket.controller.js # Request handlers for notification CRUD
├── routes/
│   └── ticket.routes.js    # API route definitions
├── models/
│   └── ticketNotification.js # Mongoose schema and model
├── services/
│   ├── notification.service.js # Database operations (service layer)
│   └── email.service.js     # Nodemailer email sending
├── middlewares/
│   └── ticket.middlewares.js # Request validation middleware
├── crons/
│   └── cron.js              # Scheduled cron job for pending emails
├── utils/
│   ├── constants.js         # HTTP status code constants
│   └── responsebody.js      # Standardized response templates
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── README.md
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd notificationService

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file with the following variables:

```
PORT = 3001
DB_NAME = "noti_db"
DB_URL = "mongodb://localhost/noti_db"
EMAIL="your-gmail@gmail.com"
EMAIL_PASS="your-app-password"
```

## Running the Server

```bash
# Start in development mode with nodemon
npm start

# Or start with node directly
node index.js
```

The server will start on the configured port (default 3001) and connect to MongoDB. The cron job will automatically start processing pending notifications every 2 minutes.

## Technologies

- [Express](https://expressjs.com/) - Web framework
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Nodemailer](https://nodemailer.com/) - Email sending
- [node-cron](https://www.npmjs.com/package/node-cron) - Task scheduling
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable loading
