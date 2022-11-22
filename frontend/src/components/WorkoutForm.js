import { useState } from 'react';

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, reps, load };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
        }

        if (response.ok) {
            setError(null);
            setTitle('');
            setReps('');
            setLoad('');
        }
    };

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>

            <label>Exercise Title</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Exercise Reps</label>
            <input type='number' onChange={(e) => setReps(e.target.value)} value={reps} />

            <label>Exercise Load</label>
            <input type='number' onChange={(e) => setLoad(e.target.value)} value={load} />

            <button>Save Workout</button>

            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default WorkoutForm;
