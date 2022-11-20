const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts.' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Get single workout.' });
});

router.post('/', async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({
            title,
            reps,
            load,
        });

        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }

    // res.json({ message: 'Create new workout.' });
});

router.patch('/:id', (req, res) => {
    res.json({ message: 'Update single workout.' });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete single workout.' });
});

module.exports = router;
