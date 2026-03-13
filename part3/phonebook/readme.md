Phonebook Backend API


URL: https://fso-exercises-1.onrender.com
A simple RESTful API built with Node.js and Express to manage a phonebook database. This server handles contact information, provides basic statistics, and includes custom request logging.
🚀 Features

    Full CRUD Support: Create, Read, and Delete contact entries.

    Validation: Ensures names are unique and that both name and number are provided.

    Request Logging: Uses morgan with a custom token to log the body of POST requests for easier debugging.

    Static Hosting: Configured to serve a production build of a frontend from the dist folder.

    CORS Enabled: Cross-Origin Resource Sharing is enabled to allow requests from different origins (e.g., a React dev server).

🛠 Installation & Setup

    Clone the repository (or copy the files).

    Install dependencies:
    Bash

npm install express morgan cors

Run the server:
Bash

    node index.js

    The server will start on http://localhost:3001.

📡 API Endpoints
Method	Endpoint	Description
GET	/api/persons	Get all phonebook entries
GET	/api/persons/:id	Get a single entry by ID
POST	/api/persons	Add a new entry (requires name and number)
DELETE	/api/persons/:id	Delete an entry by ID
GET	/info	Show entry count and server timestamp
Example POST Request Body
JSON

{
  "name": "John Doe",
  "number": "123-456789"
}

📝 Logging Configuration

The application uses morgan to log requests to the console. It is specifically configured to show the JSON body of incoming data:
POST /api/persons 200 64 - 3.124 ms {"name":"John Doe","number":"123-456789"}
📂 Project Structure

    index.js: The main entry point containing the Express application and routes.

    dist/: (Optional) Place your frontend production build here to serve it statically.

⚠️ Note on Production

This version uses an in-memory array to store data. This means that restarting the server will reset the phonebook to the original four entries. For a production environment, consider connecting this to a database like MongoDB.