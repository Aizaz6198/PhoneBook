# Phone Book MERN Application

A simple and responsive phone book application built using the MERN (MongoDB, Express, React, Node.js) stack. This project allows users to manage their contacts by adding, updating, and deleting phone numbers.

## Features

- Add new contacts with name and phone number
- View all contacts in a table format
- Edit existing contacts
- Delete contacts
- Responsive design with a stylish UI

## Technologies Used

- MongoDB: Database for storing contact information
- Express: Backend framework for handling HTTP requests
- React: Frontend library for building the user interface
- Node.js: Runtime environment for the backend
- Axios: HTTP client for making API requests
- Mongoose: ODM library for MongoDB and Node.js

## Project Structure

- `frontend/`: Contains the React application
  - `src/App.js`: Main component with all the functionality
- `backend/`: Contains the Express server
  - `index.js`: Server setup and API routes
  - `model/phonebook.js`: Mongoose schema for the phone book

## Setup and Installation

1. Clone the repository:

   cd phone-book-mern

2. Install dependencies for backend:

   cd server
   npm install

3. Install dependencies for frontend:

   cd ../client

   npm install

4. Set up MongoDB connection string in `server/index.js`:

Replace the `db` variable with your MongoDB connection string.

5. Run the backend server:

   cd ../server
   npm start

6. In a new terminal, run the React development server:

   npm start

7. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- POST `/add-phone`: Add a new contact
- GET `/get-phone`: Retrieve all contacts
- PATCH `/update-phone/:id`: Update a contact
- DELETE `/delete-phone/:id`: Delete a contact

## Future Improvements

- Implement user authentication
- Add search and filter functionality
- Improve error handling and validation
- Enhance UI/UX with animations and transitions
