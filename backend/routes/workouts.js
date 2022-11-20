const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts.' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Get single workout.' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Create new workout.' });
});

router.patch('/:id', (req, res) => {
    res.json({ message: 'Update single workout.' });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete single workout.' });
});

module.exports = router;
