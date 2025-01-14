const express = require("express");

const route = express.Router();

const profileControllers = require("../controllers/profileController");

const profileAuth = require("../middlewares/profileAuth");

route.get("/community", [ profileAuth.verifyToken ], profileControllers.getFullUser);


module.exports = route;