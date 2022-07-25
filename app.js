const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// Set up the express app
const app = express();

// Database Configuration
// const db = require("./config/db.config");
const db = require("./config").dbURL;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));

// Static Files
app.use("/", express.static("public"));

// Routes
app.use("/redirect", require("./routes/tracking"));
app.use("/api", require("./routes/forward"));

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
  // Start Application
  app.listen(8080, console.log("Server Started on Port 8080 -/-/-/-"));
});
