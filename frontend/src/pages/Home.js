import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

import WorkoutDetail from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };

        fetchWorkout();
    }, [dispatch]);

    return (
        <div className='home'>
            <div className='workouts'>{workouts && workouts.map((workout) => <WorkoutDetail key={workout._id} workout={workout} />)}</div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
