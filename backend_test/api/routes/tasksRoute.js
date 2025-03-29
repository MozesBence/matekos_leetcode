const express = require('express');
const router = express.Router();
const { getSpecificCard, getTaskCount, getRandomTask, getFilteredTasks,getsimilarTasks,getSolution,submitTask,getUnvalidatedTasks, updateTaskValidationState} = require('../controllers/tasksController');

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
 * /getsimilarTasks:
 *   get:
 *     summary: Azonos feladat
 *     tags:
 *       - Tasks
 *     description: Azonos feladat információinak lekérése
 *     parameters:
 *       - in: query
 *         name: themeid
 *         required: true
 *         schema:
 *           type: number
 *           description: Téma azonosítója
 *           example: 1
 *       - in: query
 *         name: taskId
 *         required: true
 *         schema:
 *           type: number
 *           description: A feladat azonosítója
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
router.get('/getsimilarTasks/',getsimilarTasks);

/**
 * @swagger
 * /solution/:id:
 *   get:
 *     summary: Feladat megoldása
 *     tags:
 *       - Tasks
 *     description: Feladat megoldásának adatainak lekérése
 *     parameters:
 *       - in: params
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           description: A feladat azonosítója
 *           example: 1
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  solution: 120
 *       400:
 *         description: Hiba a feladat megoldásának lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni a feladat megoldásának adatait!"
 */
router.get('/solution/:id',getSolution);

/**
 * @swagger
 * /unvalidatedTasks:
 *   get:
 *     summary: Ellenörzésre váró feladatok
 *     tags:
 *       - Tasks
 *     description: Ellenörzésre váró feladatok adatainak lekérése
 *     responses:
 *       200:
 *         description: Sikeres lekérése
 *         content:
 *           application/json:
 *              example:
 *                  tasks: [{id: 13, theme_id: 11, creator_id: null, difficulty: 2, experience_points: 25, task_title: "Gráfelmélet alapok", task: "Egy 5 csúcsú összefüggő gráfnak legalább hány éle van?", solution_format: "Egész szám", first_hint: "Egy fa éleinek száma $n-1$.", second_hint: "Összefüggő gráfban legalább annyi él van, mint egy fában.", creator: null, validated: 0}]
 *       400:
 *         description: Hiba az ellenörzésre váró feladatok adatainak lekérése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem sikerült lekérni az ellenörzésre váró feladatok adatait!"
 */
router.get('/unvalidatedTasks',getUnvalidatedTasks)

/**
 * @swagger
 * /validateTask/:
 *   post:
 *     summary: Feladat ellenőrzés
 *     tags:
 *       - Tasks
 *     description: Feladat elfogadása / elutasítása
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/validate-task'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/validate-task'
 *     responses:
 *       201:
 *         description: Sikeres ellenörzés
 *         content:
 *           application/json:
 *              example:
 *                  response: 'OK'
 *       400:
 *         description: Hiba a feladat engedélyezése / elutasítása közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem a sikerült feladat engedélyezése / elutasítása!"
 * 
 * components:
 *   schemas:
 *     validate-task:
 *       type: object
 *       required:
 *         - taskId
 *         - validity
 *         - user_id
 *         - from_user_id
 *         - message
 *       properties:
 *         taskId:
 *           type: number
 *           description: Feladat azonosítója
 *           example: 1
 *         validity:
 *           type: number
 *           description: Az ellenörzés eredménye 
 *           example: 1
 *         user_id:
 *           type: number
 *           description: Felhasználó eredménye
 *           example: 1
 *         from_user_id:
 *           type: number
 *           description: Az adminisztrátor aki végezte az ellenőrzést
 *           example: 2
 *         message:
 *           type: string
 *           description: Üzenet a felhasználó részére
 *           example: "Sikeresen el lett fogadva a feladat!"
 */
router.post('/validateTask/',updateTaskValidationState)

/**
 * @swagger
 * /submitTask:
 *   post:
 *     summary: Feladat feltöltés
 *     tags:
 *       - Tasks
 *     description: Feladat feltöltése felhasználóktól
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/submit-task'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/submit-task'
 *     responses:
 *       201:
 *         description: Sikeres feltöltés
 *         content:
 *           application/json:
 *              example:
 *                  task: {id: 13, theme_id: 11, creator_id: null, difficulty: 2, experience_points: 25, task_title: 'Gráfelmélet alapok', task: 'Egy 5 csúcsú összefüggő gráfnak legalább hány éle van?', solution_format: 'Egész szám', first_hint: 'Egy fa éleinek száma $n-1$.', second_hint: 'Összefüggő gráfban legalább annyi él van, mint egy fában.', creator: null, validated: 0}
 *       400:
 *         description: Hiba a feladat feltöltése közben
 *         content:
 *           application/json:
 *              example:
 *                  status: "400"
 *                  message: "Nem a sikerült feladat feltöltése!"
 * 
 * components:
 *   schemas:
 *     submit-task:
 *       type: object
 *       required:
 *         - theme_id
 *         - solution
 *         - difficulty
 *         - experience_points
 *         - task_title
 *         - task
 *         - solution_format
 *         - first_hint
 *         - second_hint
 *       properties:
 *         theme_id:
 *           type: number
 *           description: Téma azonosítója
 *           example: 1
 *         solution:
 *           type: string
 *           description: A feladat megoldása
 *           example: 243
 *         difficulty:
 *           type: number
 *           description: Felhasználó nehézsége
 *           example: 1
 *         experience_points:
 *           type: number
 *           description: Kapható szint a feladatért
 *           example: 2
 *         task_title:
 *           type: string
 *           description: Feladat címe
 *           example: "Egyszerű kombinatorikai feladat speciális dobókockával"
 *         task:
 *           type: string
 *           description: A feladat lírása
 *           example: "Egy szabályos játékkocka két oldalára 0-át, két oldalára 2-est, két oldalára 4-est írunk. A dobókockát ötször egymás után feldobjuk, és a dobások eredményét rendre feljegyezzük. Hányféle számötöst jegyezhetünk fel?"
 *         solution_format:
 *           type: string
 *           description: Ahogy a feladat várja az eredményt
 *           example: "Egy egész szám, mint például 1."
 *         first_hint:
 *           type: string
 *           description: Első segítség a feladathoz
 *           example: "Nem számít a sorrend."
 *         second_hint:
 *           type: string
 *           description: Második segítség a feladathoz
 *           example: "3 féle elem van (0, 2, 4) amik ismétlődnek."
 */
router.post('/submitTask',submitTask);

module.exports = router;