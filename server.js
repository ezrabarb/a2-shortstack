const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const appdata = [
  { 'showName': 'Breaking Bad', 'directorName': 'Vince Gilligan', 'comments': 'An incredible journey of transformation and moral dilemmas.', 'rating': '5', 'status': 'excellent' },
  { 'showName': 'Law and Order: SVU', 'directorName': 'Dick Wolf', 'comments': 'A compelling procedural that tackles tough issues.', 'rating': '4', 'status': 'good' },
  { 'showName': 'Avatar: The Last Airbender', 'directorName': 'Michael Dante DiMartino', 'comments': 'A excellent story but its ending was anticlimactic', 'rating': '2', 'status': 'bad' }
];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());

// GET route to serve the React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to get shows data
app.get('/shows', (req, res) => {
  res.json(appdata);
});

// POST route to add a new show
app.post('/addShow', (req, res) => {
  const newShow = req.body;
  appdata.push(newShow);
  res.status(200).json({ message: 'Show added successfully', newShow });
});

// POST route to delete a show
app.post('/delShow', (req, res) => {
  const showName = req.body.showName;
  const index = appdata.findIndex(show => show.showName === showName);
  if (index !== -1) {
    appdata.splice(index, 1);
    res.status(200).json({ message: 'Show deleted successfully' });
  } else {
    res.status(404).json({ message: 'Show not found' });
  }
});

// POST route to edit a show's rating and status
app.post('/editShow', (req, res) => {
  const { showName, rating } = req.body;
  const show = appdata.find(b => b.showName === showName);
  if (show) {
    show.rating = rating;
    show.status = (rating === '1' || rating === '2') ? 'bad' : 'good';
    res.status(200).json({ message: 'Show updated successfully', show });
  } else {
    res.status(404).json({ message: 'Show not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
