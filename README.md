# Submit Joke Service

Submit Joke Service is a backend service where users can submit jokes along with a selected joke type. While submitting jokes does not require authentication, all other routes are secured with JWT authentication.

## Features

- **Submit Jokes**: Users can submit jokes without authentication.
- **Joke Types**: Users can select a type for their joke (e.g., pun, dad joke, etc.).
- **JWT Authentication**: Access to certain routes is restricted and secured using JWT authentication.
- **MongoDB Integration**: MongoDB is used for storing jokes and user information.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **TypeScript**: Provides type safety and modern JavaScript features.
- **MongoDB**: NoSQL database for storing jokes.
- **JWT (JSON Web Tokens)**: For securing restricted routes.
- **Docker**: Multi-stage Docker setup to build and run the service efficiently.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v16 or later)
- **Yarn** (v1.22 or later)
- **Docker** (if running the service with Docker)
- **MongoDB** (or a MongoDB Atlas account)

## Setup and Installation

1. **Clone the repository**:
   
   git clone https://github.com/mmahas/submit-joke-service.git
   cd submit-joke-service

   yarn install

   yarn run dev

