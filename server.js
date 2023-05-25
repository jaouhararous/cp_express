const express = require('express');
const moment = require('moment');
const app = express();
const port = 3000;

// Custom middleware to verify working hours
const verifyWorkingHours = (req, res, next) => {
  const currentTime = moment();
  const dayOfWeek = currentTime.day();
  const hour = currentTime.hour();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('comeback during working hours monday to friday, from 9 to 17).');
  }
};

// Middleware
app.use(express.static('public'));

// Set Pug as the template engine
app.set('views', './views');
app.set('view engine', 'pug');

// Routes
app.get('/', verifyWorkingHours, (req, res) => {
  res.render('home');
});

app.get('/services', verifyWorkingHours, (req, res) => {
  res.render('services');
});

app.get('/contact', verifyWorkingHours, (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

