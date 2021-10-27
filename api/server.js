// Imports
const express = require("express");
const usersRouter = require("./users/users-router");

// Declare server
const server = express();

// Use middleware
server.use(express.json());
server.use("/api/users", usersRouter);

// Handle requests
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Exports
module.exports = server;
