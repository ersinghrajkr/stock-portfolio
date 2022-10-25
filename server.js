'use strict';
const express = require('express');
require('dotenv').config()
const morgan = require("morgan") //import morgan
const cors = require("cors") // import cors
require('./src/models/dbconnection');
const appRoutes = require('./src/api/routes/routes')
const bodyParser = require('body-parser')

// Constants
const PORT = 7000;

const app = express();
// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


// app.use((req, res, next) => {
//   const start = Date.now();
//   next();
//   const delta = Date.now() - start;
//   console.log(`Moddleware One - ${req.method} - ${req.url} ${delta}ms`);
// });
// app.use((req, res, next) => {
//   const start = Date.now();
//   next();
//   const delta = Date.now() - start;
//   console.log(`Moddleware Two - ${req.method} - ${req.url} ${delta}ms \n`);
// });


app.use(appRoutes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
