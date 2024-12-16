const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Engedélyezz minden origin-t (fejlesztéshez):
app.use(cors());

// Vagy csak egy adott origin-t engedélyezz:
app.use(cors({
  origin: 'http://localhost:5173'
}));

const mathSolveRoutes = require("./api/routes/mathSolveRoute");

const errorHandler = require("./api/middlewares/errorHandler");

app.use("/", mathSolveRoutes);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;