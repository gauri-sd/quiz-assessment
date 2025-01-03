# Quiz App API

A RESTful API service for managing and executing quizzes, built with Node.js and Express.

## Features

- Create and manage quizzes with multiple-choice questions
- Fetch quizzes and questions
- Submit answers and receive immediate feedback
- Track user performance and quiz results
- RESTful API design with proper HTTP status codes
- In-memory data storage

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose (for containerized deployment)

## Installation

1. Clone the repository:
 
    git clone https://github.com/gauri-sd/quiz-assessment.git

2. Install dependencies:

    npm install

    ## Running the Application Using Docker

    1. Build and start the containers:

        docker-compose up --build

    The API will be available at `http://localhost:3000`

    ### Without Docker

    1. Start the server:

        npm run start        

## API Endpoints

### Quizzes

- `POST /quizzes/` - Create a new quiz
- `GET /quizzes/:id` - Get a quiz by ID
- `POST /quizzes/:quizId/questions/:questionId/answer` - Submit an answer for a quiz question
- `GET /quizzes/:quizId/results/:userId` - Get quiz results

For detailed API documentation and request/response examples, see below.

## API Documentation

### Create Quiz

POST /quizzes/

CURL: 

curl --location 'http://localhost:3000/quizzes' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Sample Quiz",
  "questions": [
    {
      "text": "What is 1 + 1?",
      "options": ["0", "1", "2", "3"],
      "correct_option": 2
    },
    {
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correct_option": 1
    }
  ]
}'

### Get Quiz

GET /quizzes/:id

CURL:

curl --location 'http://localhost:3000/quizzes/94f63d2c-4ad5-47b8-bb1a-30ca7428cc9d'

### Submit Answer

POST /quizzes/:quizId/questions/:questionId/answer

CURL:

curl --location 'http://localhost:3000/quizzes/94f63d2c-4ad5-47b8-bb1a-30ca7428cc9d/questions/c4e97ddc-3686-440e-a2ed-efaa0132ac1e/answer' \
--header 'Content-Type: application/json' \
--data '{
  "userId": "user-123",
  "selected_option": 1
}'

### Get Results

GET /quizzes/:quizId/results/:userId

CURL:

curl --location 'http://localhost:3000/quizzes/94f63d2c-4ad5-47b8-bb1a-30ca7428cc9d/results/user-123'

## Testing

Run the test suite:

  npm test

## Known Limitations

- Data is stored in-memory and will be lost when the server restarts
