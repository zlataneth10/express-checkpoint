const express = require('express');
const app = express();

// Custom middleware to check if it's working hours (Monday to Friday, 9 to 17)
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Apply the custom middleware for all routes
app.use(workingHoursMiddleware);

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up static files (CSS)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
