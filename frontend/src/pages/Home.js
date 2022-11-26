import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

import WorkoutDetail from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };

        if (user) {
            fetchWorkout();
        }
    }, [dispatch, user]);

    return (
        <div className='home'>
            <div className='workouts'>{workouts && workouts.map((workout) => <WorkoutDetail key={workout._id} workout={workout} />)}</div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
