const express = require('express');
const router = express.Router();
const { getWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout } = require('../controller/workoutController');

router.get('/', getWorkouts);

router.get('/:id', getSingleWorkout);

router.post('/', createWorkout);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

module.exports = router;
