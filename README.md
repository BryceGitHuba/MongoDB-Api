# MongoDB-Api
Social Network API

This Social Network API is a backend application that allows users to share their thoughts, react to friends' thoughts, and create a friend list. Built with Express.js for routing, MongoDB as the database, and Mongoose ODM, it's designed to handle large amounts of unstructured data efficiently.

## Features

- User creation and management.
- Add and remove friends to/from a user's friend list.
- Post thoughts.
- React to thoughts.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/social-network-api.git
API Endpoints
The API supports the following endpoints:

Users
GET /api/users - Retrieve all users.
POST /api/users - Create a new user.
GET /api/users/:id - Retrieve a single user by ID.
PUT /api/users/:id - Update user details.
DELETE /api/users/:id - Delete a user.
Friends
POST /api/users/:userId/friends/:friendId - Add a friend.
DELETE /api/users/:userId/friends/:friendId - Remove a friend.
Thoughts
GET /api/thoughts - Retrieve all thoughts.
POST /api/thoughts - Create a new thought.
GET /api/thoughts/:id - Retrieve a thought by ID.
PUT /api/thoughts/:id - Update a thought.
DELETE /api/thoughts/:id - Delete a thought.
Reactions
POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought.
DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought.
Testing
You can test the API endpoints using Postman or Insomnia.
