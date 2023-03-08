// Import the necessary modules for creating the application and working with files
const express = require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

// Create a new Express application instance
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
 res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'index.html'));
});

const dbFilePath = path.join(__dirname, './db/db.json');

app.get('/api/notes', (req, res) => {
  const notes = readNotesFromFile();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = readNotesFromFile();
  const newNote = req.body;
  newNote.id = uuid();
  notes.push(newNote);
  writeNotesToFile(notes);
  res.json(newNote);
});

function readNotesFromFile() {
  const data = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(data);
}

function writeNotesToFile(notes) {
  fs.writeFileSync(dbFilePath, JSON.stringify(notes));
}

// Define the port number to listen on for incoming requests, either from an environment variable or 3001 if not set
const PORT = process.env.PORT || 3001;
// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});