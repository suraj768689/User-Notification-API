## User Notification API

This project provides an API for managing user notification preferences. It allows users to create, fetch, and manage notifications via a serverless deployment on Vercel. It is built using NestJS and MongoDB.

## Features

* Create Notification: Allows sending notifications to users.
* Get User Notifications: Allows fetching all notifications associated with a specific user.
* Manage Notification Preferences: Users can manage their notification preferences based on different channels (e.g., email, SMS).

## Table of Contents

1. Installation
2. Setup and Configuration
3. Deployment
4. API Documentation
5. Example Requests and Responses
6. Environment Variables
7. Tests

## Installation

To install and run the project locally, follow these steps:
1. Clone the repository:
```bash  
git clone https://github.com/suraj768689/User-Notification-API.git
```
3. Navigate to the project directory:
```bash   
cd User-Notification-API
```
4. Install the dependencies:
```bash  
npm install
```

Create a .env file for environment variables. (See the Environment Variables section below for details).

## Setup and Configuration
Before starting the project, make sure you have the following:

* Node.js installed (version 16 or above)
* MongoDB setup or access to a MongoDB cluster (MongoDB Atlas or local instance)
* Vercel or AWS Lambda for serverless deployment

1. Configure environment variables: Create a .env file at the root of the project with the following keys:
```bash
 MONGODB_URI=your_mongodb_connection_string     
 PORT=3000
```
2. Run the application locally:

 To start the server locally, run:
```bash
 npm run start
```
This will start the NestJS application on http://localhost:3000.

## Deployment

The API has been deployed using Vercel. You can access it at the following URL:

User Notification API on Vercel

## Deployment Steps (for reference):
1. Install Vercel CLI if you don't have it:
```bash
 npm i -g vercel
```
2. Deploy the project:
```bash
 vercel
```
Unfortunately, the deployment did not succeed due to issues with build configuration and missing files for serverless functions.

Deployed API URL: https://user-notification-api-three.vercel.app

## API Documentation

Endpoints

## 1. Create Notification
* POST /notifications/send
* Description: Sends a notification to the user.
* Request Body:
```bash
{
  "userId": "string",
  "type": "string",
  "channel": "string"
}
```
Response:
* 200 OK: Notification created successfully.
* 400 Bad Request: Invalid data.

## 2.  Get User Notifications
* GET /notifications/user/
* Description: Fetches all notifications for a specific user.
Response:
* 200 OK: Array of notifications.
* 404 Not Found: User not found.

## APIS
## FOR USER
POST
```bash
http://localhost:3000/api/preferences
```

Response
```bash
{
    "userId": "user123",
    "email": "user@example.com",
    "preferences": {
        "marketing": true,
        "newsletter": false,
        "updates": true,
        "frequency": "weekly",
        "channels": {
            "email": true,
            "sms": false,
            "push": true
        }
    },
    "timezone": "America/New_York",
    "_id": "673c747967928d64bbadde6e",
    "createdAt": "2024-11-19T11:20:25.419Z",
    "lastUpdated": "2024-11-19T11:20:25.425Z",
    "__v": 0
}
```

GET
```bash
http://localhost:3000/api/preferences/user123
```

Response
```bash
{
    "_id": "673c747967928d64bbadde6e",
    "userId": "user123",
    "email": "user@example.com",
    "preferences": {
        "marketing": true,
        "newsletter": false,
        "updates": true,
        "frequency": "weekly",
        "channels": {
            "email": true,
            "sms": false,
            "push": true
        }
    },
    "timezone": "America/New_York",
    "createdAt": "2024-11-19T11:20:25.419Z",
    "lastUpdated": "2024-11-19T11:20:25.425Z",
    "__v": 0
}
```

PATCH
```bash
http://localhost:3000/api/preferences/user123
```

Request
```bash
{
  "preferences": {
    "smsNotifications": true,
    "pushNotifications": false
  }
}
```

Response
```bash
{
    "_id": "673c747967928d64bbadde6e",
    "userId": "user123",
    "email": "user@example.com",
    "preferences": {
        "smsNotifications": true,
        "pushNotifications": false
    },
    "timezone": "America/New_York",
    "createdAt": "2024-11-19T11:20:25.419Z",
    "lastUpdated": "2024-11-19T11:20:25.425Z",
    "__v": 0
}
```

DELETE
```bash
http://localhost:3000/api/preferences/user123
```

Response
```bash
{
    "acknowledged": true,
    "deletedCount": 1
}
```

## FOR NOTIFICATIONS

POST
```bash
http://localhost:3000/api/notifications/send
```

Request
```bash
{

  "userId": "user123",

  "type": "marketing",

  "channel": "email",

  "content": {

    "subject": "Special Offer",

    "body": "Check out our latest deals!"

  }

}
```

Response
```bash
{
    "message": "Notification sent successfully",
    "savedNotification": {
        "userId": "user123",
        "type": "marketing",
        "channel": "email",
        "status": "pending",
        "__v": 0,
        "_id": "673c7a8667928d64bbadde77"
    }
}
```

GET
```bash
http://localhost:3000/api/notifications/user123/logs
```

Response
```bash
[
    {
        "_id": "673b7a530299a987b18fa3d4",
        "userId": "user123",
        "type": "marketing",
        "channel": "email",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "673b7ac4b8dacc0a9ddd79ed",
        "userId": "user123",
        "type": "marketing",
        "channel": "email",
        "status": "pending",
        "__v": 0
    }
]
```

GET
```bash
http://localhost:3000/api/notifications/stats
```

Response
```bash
[
    {
        "_id": "pending",
        "count": 2
    }
]
```

## Environment Variables

The following environment variables are required:
* MONGODB_URI: The connection string to your MongoDB instance (either local or cloud-based).
* PORT: The port on which the API will run (default is 3000).

## Tests

To run the tests for the project, use the following command:

npm run test

## Conclusion

The User Notification API has been successfully deployed on Vercel. The deployment was completed correctly after resolving some initial issues related to serverless configuration.

GitHub Repository: https://github.com/suraj768689/User-Notification-API.git

Deployed API URL: https://user-notification-api-three.vercel.app


