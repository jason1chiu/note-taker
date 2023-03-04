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