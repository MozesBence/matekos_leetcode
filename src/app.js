const express = require("express");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then((module) => module.default(...args));

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Engedélyezz minden origin-t (fejlesztéshez):
app.use(cors());

// Vagy csak egy adott origin-t engedélyezz:
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

const errorHandler = require("./api/middlewares/errorHandler");

app.use("/", mathSolveRoutes);

app.use(errorHandler.notFoundError);

app.use(errorHandler.showError);

module.exports = app;