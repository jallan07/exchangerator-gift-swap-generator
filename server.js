// app dependencies
const express = require('express');
const app = express();

// define the port
const PORT = process.env.PORT || 3030;

// set the view engine
app.set('view engine', 'ejs');

// use the routes file
require('./routes/html')(app);

// set the server to listen on a specific port
app.listen(PORT, () => {
  console.log(`App is listening on port http://localhost:${PORT}`);
});