const { get } = require('lodash');
const { Tasks } = require('../database/dbContext');
const tasksService = require('../services/tasksServices');

const getCardInfo = async (req, res) => {
  try {
    const { offset } = req.params;
    const numericOffset = parseInt(offset, 10) || 0;
    const cards = await tasksService.getCardInfo(numericOffset);
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error in tasks controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};


const getSpecificCard = async (req,res,next) =>{
  try{
    const { id } = req.params;
    const card = await tasksService.getSpecificCard(id);
    res.status(200).json(card);
  }catch(error){
    console.error('Error in tasks controller:', error.message);
    res.status(500).json({ message: error.message });
  }
}

const getTaskCount = async (req,res,next) => {
  try {
      const tasks = await tasksService.getTaskCount(req.query);
      res.json(tasks);
  } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
  }
}

const getRandomTask = async (req,res,next) => {
  try{
    const randomTask = await tasksService.getRandomTask();
    res.status(200).json(randomTask)
  }
  catch(error){
    console.log(`Error in tasks controller: ${error.message}`);
    res.status(500).json({ message: error.message });
  }  

}
const getTaskWithSearch = async (req, res, next) => {
  try {
    const { characters } = req.params;
    const filteredTasks = await tasksService.getTaskWithSearch(characters);
    res.status(200).json(filteredTasks);
  } catch (error) {
    console.log(`Error in tasks controller: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}
const getTasksByDifficult = async (req,res,next) =>{
  try{
    const {difficulty} = req.params;
    const filteredTasks = await tasksService.getTasksByDifficult(difficulty)
    res.status(200).json(filteredTasks);
  }catch(error){
    console.log(`Error in tasks controller: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getTaskByThemes = async (req, res, next) => {
  try {
    const themes = req.params.themes.split(';');
    console.log('Received themes:', themes);
    const filteredTasks = await tasksService.getTaskByThemes(themes);
    res.status(200).json(filteredTasks);
  } catch (error) {
    console.error(`Error in tasks controller: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getFilteredTasks = async (req, res) => {
  console.log(req.query)
  try {
      const tasks = await tasksService.getFilteredTasks(req.query);
      res.status(200).json(tasks);
  } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
  }
};


const getsimilarTasks = async (req,res) => {
  try{
    const {themeid} = req.params
    const similarTasks = await tasksService.getsimilarTasks(themeid);
    res.status(200).json(similarTasks);
  }catch(error){
    res.status(500).json({ message: "Error fetching tasks" });
  }
} 

const getSolution = async (req,res) => {
  try{
    const {id} = req.params;
    const solution = await tasksService.getSolution(id);
    res.status(200).json(solution);
  }catch(error){
    res.status(500).json({ message: "Error fetching tasks" });
  }
}


const submitTask = async (req,res) => {
  try{
    const task = await tasksService.submitTask(req.body);
    res.status(201).json(task)
  }catch(error){
    res.status(500).json({ message: "Error feladat postolása közben!" });
  }
}

module.exports = {
  getCardInfo,
  getSpecificCard,
  getTaskCount,
  getTaskWithSearch,
  getRandomTask,
  getTasksByDifficult,
  getTaskByThemes,
  getFilteredTasks,
  getsimilarTasks,
  getSolution,
  submitTask
};
