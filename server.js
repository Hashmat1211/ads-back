/* IMPORTING MODULES */

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const HttpStatus = require('http-status-codes');
// const cors = require('cors')

// app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );


  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


/* ROUTES */

const adsRoute = require("./api/routes/ads.routes");


/* MIDDLEWARES */

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/*  ROUTE */
app.use("/ads", adsRoute);

/* HANDLING ERROR MIDDLEWARES */

app.use((req, res, next) => {
  const err = new Error("Yakh Pakh ~ Route not found");
  err.status = HttpStatus.NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("error in server server.js ", err);
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: err.message
  });
});

const port = 4000;

/* lISTENING PORT */
app.listen(process.env.PORT || port, function () {
  console.log("Node server is up and running.. on ", port);
});
