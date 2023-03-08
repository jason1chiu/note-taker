// Import necessary modules for creating the application and working with files
const express = require('express'); // Express.js web framework
const fs = require('fs'); // File System module for working with files
const path = require('path'); // Module for working with file paths
const {v4: uuid} = require('uuid'); // Package for generating unique IDs

// Create a new Express application instance
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(express.json()); // Middleware for parsing JSON data
app.use(express.static('public')); // Middleware for serving static files

// Define file paths
const indexPath = path.join(__dirname, 'index.html'); // Path to index.html file
const notePath = path.join(__dirname, './public/notes.html'); // Path to notes.html file
const dbPath = path.join(__dirname, './db/db.json'); // Path to JSON file for storing notes data

// Serve notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(notePath);
});

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

// Read all notes data from JSON file
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Create a new note and save to JSON file
app.post('/api/notes', (req, res) => {
  const notes = readNotes();
  const newNote = req.body;
  newNote.id = uuid();
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// Delete a note with a specific ID from JSON file
app.delete('/api/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = req.params.id;
  const updatedNotes = notes.filter(note => note.id !== noteId);
  writeNotes(updatedNotes);
  res.json(updatedNotes);
});

// Function for reading notes data from JSON file
function readNotes() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Function for writing notes data to JSON file
function writeNotes(notes) {
  fs.writeFileSync(dbPath, JSON.stringify(notes));
}

// Define the port number to listen on for incoming requests, either from an environment variable or 3001 if not set
const PORT = process.env.PORT || 3001;

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});