require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const URL = '/api';

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use(`${URL}/workouts`, workoutRoutes);

// Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to database & listening on port ${process.env.PORT}...`
      );
    });
  })
  .catch((error) => {
    console.log(`Database error : ${error}`);
  });
