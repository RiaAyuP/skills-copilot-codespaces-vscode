// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up the body-parser middleware
app.use(bodyParser.json());

// Create a GET route that responds with the comments.json file
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Create a POST route that adds a new comment to the comments.json file
app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred: ' + err);
    } else {
      let comments = JSON.parse(data);
      comments.push(req.body);

      fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('An error occurred: ' + err);
        } else {
          res.send('Comment added successfully');
        }
      });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});