const express = require("express");
const path = require("path");

const db = require("./db/db");
const PORT = process.env.PORT || 3001;

const indexRouter = require("./routes/index");
const clientsRouter = require("./routes/clients");
const citiesRouter = require("./routes/cities");
const mastersRouter = require("./routes/masters");

const app = express();
db.authenticate()
  .then(console.log("db connected"))
  .catch((err) => console.log("connection error: ", err));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static("client/public"));

app.use("/index", indexRouter);
app.use("/clients", clientsRouter);
app.use("/cities", citiesRouter);
app.use("/masters", mastersRouter);

app.listen(PORT, console.log(`server starts on port ${PORT}`));
