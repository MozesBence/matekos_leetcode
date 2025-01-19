require("dotenv").config();

const app = require("./app");
require('../src/api/scheduler/scheduler'); 
app.listen(process.env.PORT);