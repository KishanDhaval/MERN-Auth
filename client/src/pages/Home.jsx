import { useEffect, useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetail from '../components/WorkoutDetail';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts', {
          headers: {
            // this for check is logding
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json })
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetail key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
