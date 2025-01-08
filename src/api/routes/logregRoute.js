const express = require("express");

const route = express.Router();

const logregControllers = require("../controllers/logregController");

const mathSolveControllers = require("../controllers/mathSolveControllers");

route.get("/register", mathSolveControllers.getUsers);

route.post("/register", logregControllers.registerUser);

route.post("/login", logregControllers.loginUser);

route.post("/forget-password", logregControllers.forgetPassword);

route.patch("/set-new-password", logregControllers.setNewPassword);

route.post("/success-register", logregControllers.successRegister);

module.exports = route;