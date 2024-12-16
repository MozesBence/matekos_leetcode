const express = require("express");

const route = express.Router();

const mathSolveControllers = require("../controllers/mathSolveControllers");

route.get("/register", mathSolveControllers.getUsers);

route.post("/register", mathSolveControllers.registerUser);

route.post("/login", mathSolveControllers.loginUser);

route.post("/forget-password", mathSolveControllers.forgetPassword);

route.patch("/set-new-password", mathSolveControllers.setNewPassword);

route.get("/profile", mathSolveControllers.getFullUser);

module.exports = route;