# **URL Shortener API**

> This project is a URL shortener service built with Node.js, Express, and MongoDB. It allows users to create shortened URLs, log in, sign up, and view analytics for shortened URLs.

## **API Documentation:**

API documentation is provided by Swagger.After starting the server, navigate to [http://localhost:8000/api-docs](http://localhost:8000/api-docs) to view the Swagger UI.

## Project Overview

This project is a URL shortener service built using Node.js, Express, and MongoDB. The service provides the following functionalities:

1.  **User Registration**:

- Allows new users to sign up by providing an email and password.
- Stores user credentials securely using hashing.

2.  **User Authentication**:

- Allows registered users to log in using their email and password.
- Issues a JSON Web Token (JWT) upon successful authentication to maintain session security.

3.  **URL Shortening**:

- Authenticated users can create shortened versions of long URLs.
- Generates a unique shortened URL code for each original URL.

4.  **URL Redirection**:

- Redirects users to the original URL when they access the shortened URL.
- Handles HTTP GET requests to shortened URL endpoints and performs the redirection.

5.  **URL Analytics**:

- Tracks and provides analytics for each shortened URL.
- Retrieves data such as the number of times the shortened URL has been accessed.

6.  **API Documentation**:

- Provides comprehensive API documentation using Swagger.
- Allows developers to test API endpoints directly from the documentation interface.

## Key Features

1.  **RESTful API**:

- Follows REST principles to provide a scalable and maintainable API structure.

2.  **Authentication and Authorization**:

- Implements secure authentication using JWT.
- Ensures that only authenticated users can create and manage shortened URLs.

3.  **Data Persistence**:

- Uses MongoDB to store user information, shortened URLs, and analytics data.
- Leverages Mongoose for schema definition and interaction with MongoDB.

4.  **Scalability**:

- Designed to handle a growing number of users and URLs efficiently.
- Can be easily scaled horizontally by adding more instances of the application.

5.  **Error Handling**:

- Provides robust error handling and meaningful error messages for API consumers.
- Ensures that invalid requests are appropriately handled and do not crash the server.

6.  **Security**:

- Hashes user passwords before storing them in the database.
- Secures API endpoints to prevent unauthorized access and ensure data integrity.

## Benefits

1.  **Easy to Use**:

- Simple and intuitive API endpoints for user registration, login, URL shortening, and analytics.
- Detailed API documentation to assist developers in integrating the service.

2.  **Efficient**:

- Provides fast URL redirection with minimal latency.
- Efficiently stores and retrieves data using MongoDB.

3.  **Extensible**:

- Modular architecture allows for easy addition of new features and enhancements.
- Well-structured codebase that follows best practices for maintainability.

Prerequisites:

Before you begin, ensure you have the following installed on your system:

- Node.js

- MongoDB

Installation:

Clone the repository:

git clone [https://github.com/ShreyasPrabhu26/Linkify](https://github.com/ShreyasPrabhu26/Linkify)

Navigate to the project directory:

cd Linkify

Install dependencies:

npm install

Create a .env file in the root of the project and add the following environment variables:

- PORT=your-port

- MONGODB_URI=your-mongodb-connection-string

- JWT_SECRET=your-jwt-secret

Running the Application:

Start the Node.js application:

npm start
