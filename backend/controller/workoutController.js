const Workout = require('../models/Workout');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
};

const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'Workout is not found.',
        });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({
            message: 'Workout is not found.',
        });
    }

    res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }

    if (!reps) {
        emptyFields.push('reps');
    }

    if (!load) {
        emptyFields.push('load');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            message: 'Please fill in all the fields!',
            emptyFields,
        });
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({
            title,
            reps,
            load,
            user_id,
        });

        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'Workout is not found.',
        });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(id, {
            ...req.body,
        });

        if (!workout) {
            return res.status(404).json({
                message: 'Workout is not found.',
            });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'Workout is not found.',
        });
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
        return res.status(404).json({
            message: 'Workout is not found.',
        });
    }

    return res.status(200).json(workout);
};

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
