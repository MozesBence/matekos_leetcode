const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
app.use('/api/tasks',tasksRoutes)
/*------------*/

/*User info for mainpage (not working maybe not even neccersary)*/
const userdataRoutes = require('./api/routes/userdataRoute')
app.use('/api/userdata',userdataRoutes)
/*--------------------- */
const quoteRoute = require('./api/routes/quoteroute');
app.use('/api/quotes', quoteRoute);

const errorHandler = require("./api/middlewares/errorHandler");

app.use("/", mathSolveRoutes);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;
