const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middlewares/errorHandler");

const swaggerUi = require('swagger-ui-express');

const swaggerJsdoc = require('swagger-jsdoc');

const options = 
{ 
  definition: 
  {
    openapi: '3.0.0',
    info: {
      title: 'MathSolve API',
      version: '1.0.0',
    },
  },
  apis: ["./api/routes/*.js", "./api/models/index.js"],
};

const customDisableTryItOutPlugin = () => {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: (ori, system) => (path, method) => {
            const operation = system.specSelectors.getOperation(path, method);
            // Ezek a log üzenetek a böngésző fejlesztői konzoljában jelennek meg,
            // mivel a plugin a Swagger UI kliensoldalán fut.
            console.log(`Ellenőrzés ${method.toUpperCase()} ${path}:`, operation && operation.get("x-disable-try-it-out"));
            if (operation && operation.get("x-disable-try-it-out") === true) {
              return false;
            }
            return ori(path, method);
          }
        }
      }
    }
  };
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification, {
  customPlugins: [ customDisableTryItOutPlugin ]
}));
// Or allow only a specific origin:
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/drive-video', async (req, res) => {
  const videoUrl = 'https://drive.google.com/uc?export=download&id=1nQVWypom79l5_KIWB5BRtF4S733jDufo'; // Google Drive link
  try {
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error('Failed to load video');
    }
    res.setHeader('Content-Type', 'video/mp4');
    response.body.pipe(res); // Stream video to the client
  } catch (error) {
    res.status(500).send('Error loading video');
  }
});

const mathSolveRoutes = require("./api/routes/mathSolveRoute");

/*Theme routes*/
const themeRoutes = require('../src/api/routes/themeRoute');
app.use('/api/themes', themeRoutes);
/*------------*/

/*Task routes */
const tasksRoutes = require('../src/api/routes/tasksRoute')
app.use('/api/tasks',tasksRoutes);
/*------------*/

const quoteRoute = require('./api/routes/quoteroute');
app.use('/api/quotes', quoteRoute);

app.use("/", mathSolveRoutes);

/*LogReg routes */
const logregRoute = require('../src/api/routes/logregRoute')
app.use('/',logregRoute);
/*------------*/

/*Profile routes */
const profileRoute = require('../src/api/routes/profileRoute')
app.use('/',profileRoute);
/*------------*/

//main page stats routes
const task_solution_route = require('../src/api/routes/task_solutionsRoute')
app.use('/api/task_solution',task_solution_route);
//----------------------

//community page routes
const community_route = require('../src/api/routes/communityRoute');
app.use('/',community_route);
//----------------------

//contest page routes
const contest_route = require('../src/api/routes/contestRoute');
app.use('/',contest_route);
//----------------------


//settings confirm routes
const settingsConf_route = require('../src/api/routes/settingsConfirmRoute');
app.use('/',settingsConf_route);
//----------------------

const daily_tasks_route = require('../src/api/routes/daily_taskRoute');
app.use('/api/daily_tasks',daily_tasks_route);

const advertisement_cards = require('../src/api/routes/advertisement_cards_routes')
app.use('/api/ads',advertisement_cards)

const storeItems = require('./api/routes/storeItemsRoute')
app.use('/api/store',storeItems)

const transactionsRoute = require('./api/routes/transactionRoute')
app.use('/api/transactions', transactionsRoute)

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;
