require('dotenv').config();

const express = require('express');

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome the My Workout App!' });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
