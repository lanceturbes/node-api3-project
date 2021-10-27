// Imports
const express = require("express");

// Declare server
const server = express();

// Use middleware
server.use(express.json());

// Handle requests
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Exports
module.exports = server;
