import { useEffect, useState } from 'react';

import WorkoutDetail from '../components/WorkoutDetail';

const Home = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        };

        fetchWorkout();
    }, []);

    return (
        <div className='home'>
            <div className='workouts'>{workouts && workouts.map((workout) => <WorkoutDetail key={workout._id} workout={workout} />)}</div>
        </div>
    );
};

export default Home;
