const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./api/middlewares/errorHandler");

// Enable CORS for all origins (for development):
app.use(cors());

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

const cron = require('node-cron');
const dailyTasksService = require('../src/api/services/dailyTasksService'); // Import your service

// Schedule the task to run at midnight on the first day of every month
cron.schedule('0 0 1 * *', async () => {
  console.log('Assigning new daily tasks for the month');
  await dailyTasksService.assignDailyTasks();
});

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;
