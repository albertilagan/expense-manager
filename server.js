const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// DB Config
const db = require('./server/config/db').mongoURI;
const port = process.env.PORT || 3000;

// Body Parser
app.use(bodyParser.json());
app.use(cors());

// Connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to database...'))
  .catch(err => console.log(err));

// User Route
app.use('/api', require('./server/routes/api.route'))
// Error Handler
app.use(function(err, req, res, next) {
  if (err) {
    res.status(400).json({
      error: err
    })
  }
})

// Start server
app.listen(3000, () => {
  console.log(`Server started on ${port}`);
});