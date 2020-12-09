// app dependencies
const express = require('express');
const app = express();

// view engine
app.set('view engine', 'ejs');

// static css
app.use(express.static('public'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// use the routes file
require('./routes/html')(app);

// define the port
const PORT = process.env.PORT || 3030;

// set the server to listen on a specific port
app.listen(PORT, () => {
  console.log(`App is listening on port http://localhost:${PORT}`);
});
