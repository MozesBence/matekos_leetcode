const express = require('express');
const router = express.Router();
const { getCardInfo, getSpecificCard, getTaskCount, getRandomTask, getFilteredTasks,getsimilarTasks,getSolution,submitTask,getUnvalidatedTasks, updateTaskValidationState} = require('../controllers/tasksController');

router.get('/get-cards-info/:offset', getCardInfo);

/**
 * @swagger
 * /get-one-card/:id:
 *   get:
 *     summary: Feladat információi
 *     tags:
 *       - Tasks
 *     description: Feladat információi lekérése
 *     parameters:
 *       - in: params
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Feladat azonosítója
 *           example: 0
 *     responses:
 *       200:
 *         description: Sikeres információ lekérése
 *         content:
 *           application/json:
 *              example:
 *                  task: {id: 13, theme_id: 11, creator_id: null, difficulty: 2, experience_points: 25, task_title: 'Gráfelmélet alapok', task: 'Egy 5 csúcsú összefüggő gráfnak legalább hány éle van?', solution_format: 'Egész szám', first_hint: 'Egy fa éleinek száma $n-1$.', second_hint: 'Összefüggő gráfban legalább annyi él van, mint egy fában.', creator: null}
 *       400:
 *         description: Hiba az információk lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladat információit!"
 */
router.get('/get-one-card/:id',getSpecificCard)

/**
 * @swagger
 * /taskCount:
 *   get:
 *     summary: Feladatok mennyisége
 *     tags:
 *       - Tasks
 *     description: Feladat mennyiségének lekérése
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: number
 *           description: Feladat nehézsége
 *           example: 1
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           description: Feladat címe
 *           example: "Harmadfokú egyenlet"
 *       - in: query
 *         name: themes
 *         schema:
 *           type: string
 *           description: Feladat témái
 *           example: "1;2"
 *       - in: query
 *         name: state
 *         schema:
 *           type: number
 *           description: Feladat készenléti állapota
 *           example: 1
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  task_count: 11
 *       400:
 *         description: Hiba a mennyiség lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a mennyiséget!"
 */
router.get('/taskCount',getTaskCount);

/**
 * @swagger
 * /random-task:
 *   get:
 *     summary: Véletlenszerű feladat
 *     tags:
 *       - Tasks
 *     description: Véletlenszerű feladat információinak lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  id: 1
 *       400:
 *         description: Hiba a véletelenszerű feladat lekérésben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladat azonosítóját!"
 */
router.get('/random-task',getRandomTask);

/**
 * @swagger
 * /filteredTasks:
 *   get:
 *     summary: Feladatok szűrése
 *     tags:
 *       - Tasks
 *     description: Feladatok szűrésének lekérdezése
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: number
 *           description: Feladat nehézsége
 *           example: 1
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *           description: Feladat címe
 *           example: "Harmadfokú egyenlet"
 *       - in: query
 *         name: themes
 *         required: true
 *         schema:
 *           type: string
 *           description: Feladat témái
 *           example: "1;2"
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: number
 *           description: Feladat készenléti állapota
 *           example: 1
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *           description: Felhasználó azonosítója
 *           example: 1
 *       - in: query
 *         name: offset
 *         required: true
 *         schema:
 *           type: number
 *           description: Hanyadik feladattól történjen a szűrés
 *           example: 10
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  tasks: [{id: 13, theme_id: 11, creator_id: null, difficulty: 2, experience_points: 25, task_title: "Gráfelmélet alapok", task: "Egy 5 csúcsú összefüggő gráfnak legalább hány éle van?", solution_format: "Egész szám", first_hint: "Egy fa éleinek száma $n-1$.", second_hint: "Összefüggő gráfban legalább annyi él van, mint egy fában.", creator: null}]
 *       400:
 *         description: Hiba a szűrés közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a szűrt feladatokat!"
 */
router.get('/filteredTasks', getFilteredTasks);

/**
 * @swagger
 * /getsimilarTasks/:themeid:
 *   get:
 *     summary: Azonos feladat
 *     tags:
 *       - Tasks
 *     description: Azonos feladat információinak lekérése
 *     parameters:
 *       - in: params
 *         name: themeid
 *         required: true
 *         schema:
 *           type: number
 *           description: Téma azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  task: [{id: 1, theme_id: 11, difficulty: 2, task_title: "Gráfelmélet alapok"}]
 *       400:
 *         description: Hiba a feladat információinak lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni azonos feladatot!"
 */
router.get('/getsimilarTasks/:themeid',getsimilarTasks);

/**
 * @swagger
 * /solution/:id:
 *   get:
 *     summary: Feladat megoldása
 *     tags:
 *       - Tasks
 *     description: Feladat megoldásának adai lekérése
 *     parameters:
 *       - in: params
 *         name: themeid
 *         required: true
 *         schema:
 *           type: number
 *           description: Téma azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  id: "{id: 1, theme_id: 11, difficulty: 2, task_title: "Gráfelmélet alapok"}"
 *       400:
 *         description: Hiba a 
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladat azonosítóját!"
 */
router.get('/solution/:id',getSolution);

router.get('/unvalidatedTasks',getUnvalidatedTasks)

router.post('/validateTask/',updateTaskValidationState)

router.post('/submitTask',submitTask);

module.exports = router;
