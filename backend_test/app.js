const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middlewares/errorHandler");

// Or allow only a specific origin:
app.use(cors({
  origin: '*'
}));

/*Theme routes*/
const themeRoutes = require('./api/routes/themeRoute');
app.use('/', themeRoutes);
/*------------*/

/*Task routes */
const tasksRoutes = require('./api/routes/tasksRoute')
app.use('/api/tasks',tasksRoutes);
/*------------*/

const quoteRoute = require('./api/routes/quoteroute');
app.use('/api/quotes', quoteRoute);

/*LogReg routes */
const logregRoute = require('./api/routes/logregRoute')
app.use('/',logregRoute);
/*------------*/

/*Profile routes */
const profileRoute = require('./api/routes/profileRoute')
app.use('/',profileRoute);
/*------------*/

//main page stats routes
const task_solution_route = require('./api/routes/task_solutionsRoute')
app.use('/api/task_solution',task_solution_route);
//----------------------

//community page routes
const community_route = require('./api/routes/communityRoute');
app.use('/',community_route);
//----------------------

//contest page routes
const contest_route = require('./api/routes/contestRoute');
app.use('/',contest_route);
//----------------------

//settings confirm routes
const settingsConf_route = require('./api/routes/settingsConfirmRoute');
app.use('/',settingsConf_route);
//----------------------

const daily_tasks_route = require('./api/routes/daily_taskRoute');
app.use('/api/daily_tasks',daily_tasks_route);

const advertisement_cards = require('./api/routes/advertisement_cards_routes')
app.use('/api/ads',advertisement_cards)

const storeItems = require('./api/routes/storeItemsRoute')
app.use('/api/store',storeItems)

const transactionsRoute = require('./api/routes/transactionRoute')
app.use('/api/transactions', transactionsRoute)

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;
