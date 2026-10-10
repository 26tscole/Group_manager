const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);

// Route
app.get('/', (req, res) => {
  res.send('Welcome to the node server!');
});

// Another Route
app.get('/api/hello', (req, res) => {
  res.send('Hello from the API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});