const express = require("express");

const route = express.Router();

const communityControllers = require("../controllers/communityControllers");

const profileControllers = require("../controllers/profileController");

const profileAuth = require("../middlewares/profileAuth");

route.get("/community", [ profileAuth.verifyToken ], profileControllers.getFullUser);

route.post("/community", communityControllers.postUpload);

module.exports = route;