const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const User = require("../models/users.model");

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

const ads = [{ title: "Hello, world (again)!" }];

// defining an endpoint to return all ads
app.get("/", (req, res) => {
  res.send(ads);
});

app.post("/users", (req, res) => {
  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("User saved successfully");
    }
  });
});

app.get("/users", (req, res) => {
  // Find all users
  User.find((error, users) => {
    if (error) {
      res.send(error);
    } else {
      res.send(users);
    }
  });
});

app.get("/users/:id", (req, res) => {
  // Find a single user by ID
  User.findById(req.params.id, (error, user) => {
    if (error) {
      res.send(error);
    } else {
      res.send(user);
    }
  });
});

app.put("/users/:id", (req, res) => {
  // Update a user
  User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    (error, user) => {
      if (error) {
        res.send(error);
      } else {
        res.send(user);
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  // Delete a user
  User.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("User deleted");
    }
  });
});

module.exports = app;
