/* IMPORTING MODULES */

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connetdb = require("./dependencies/connectiondb");
const cors = require("./dependencies/cors");
const HttpStatus = require('http-status-codes');
const path = __dirname + '/public/';

/* ROUTES */

const developerRoutes = require("./api/routes/developers.routes");
const clientRoutes = require("./api/routes/clients.routes");
const expenseRoutes = require("./api/routes/expenses.routes");
const incomeRoutes = require("./api/routes/incomes.routes");
const projectRoutes = require("./api/routes/projects.routes");

/* MONGODB CONNECTION */

connetdb();

/* using mongoose promise */

mongoose.Promise = global.Promise;

/* MIDDLEWARES */

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*  HANDLING CORS */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, UPDATE");
    return res.status(200).json({});
  }
  next()
});

/* SERVING STATIC FILES */

app.use("/public", express.static("public"));

/*  ROUTE */
app.use("/expenses", expenseRoutes);
app.use("/incomes", incomeRoutes);
app.use("/developers", developerRoutes);
app.use("/projects", projectRoutes);
app.use("/clients", clientRoutes);

app.get("/", (req, res) => {
  res.sendFile(path + 'index.html');
});
app.get("/index.html", (req, res) => {
  res.sendFile(path + 'index.html');
});
app.get("/addDeveloper.html", (req, res) => {
  res.sendFile(path + 'addDeveloper.html');
});
app.get("/addExpense.html", (req, res) => {
  res.sendFile(path + 'addExpense.html');
});
app.get("/addIncome.html", (req, res) => {
  res.sendFile(path + 'addIncome.html');
});
app.get("/addClient.html", (req, res) => {
  res.sendFile(path + 'addClient.html');
});
app.get("/addProject.html", (req, res) => {
  res.sendFile(path + 'addProject.html');
});
app.get("/viewProjects.html", (req, res) => {
  res.sendFile(path + 'viewProjects.html');
});
app.get("/viewClients.html", (req, res) => {
  res.sendFile(path + 'viewClients.html');
});
app.get("/viewDevelopers.html", (req, res) => {
  res.sendFile(path + 'viewDevelopers.html');
});
app.get("/viewIncomes.html", (req, res) => {
  res.sendFile(path + 'viewIncomes.html');
});
app.get("/viewExpenses.html", (req, res) => {
  res.sendFile(path + 'viewExpenses.html');
});
app.get("/updateIncome.html/:id", (req, res) => {
  res.sendFile(path + 'updateIncome.html');
});

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

const port = 5000;

/* lISTENING PORT */
app.listen(process.env.PORT || port, function () {
  console.log("Node server is up and running.. on ", port);
});
