/* IMPORTING MODULES */

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const HttpStatus = require('http-status-codes');


/* ROUTES */

const adsRoute = require("./api/routes/ads.routes");

/* MIDDLEWARES */

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*  HANDLING CORS */

app.use((req, res, next) => {
  console.log('cors ...')
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
});

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
