const express = require('express');
const router = express.Router();
const { getWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout } = require('../controller/workoutController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', getWorkouts);

router.get('/:id', getSingleWorkout);

router.post('/', createWorkout);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

module.exports = router;
