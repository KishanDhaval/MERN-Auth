import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { RiDeleteBin6Line } from "react-icons/ri";
import {useAuthContext} from "../hooks/useAuthContext"

// date fns
import formateDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetail({workout}) {
    
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const handleClick =async()=>{
        if(!user){
            return
        }

        const response = await fetch(`http://localhost:4000/api/workouts/` + workout._id , {
            method :'DELETE',
            headers : {
                // this for check is logding
                'Authorization' :`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type : 'DELETE_WORKOUT' , payload : json})
        }
    }

  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong> {workout.load}</p>
        <p><strong>Reps :</strong> {workout.reps}</p>
        <p>{formateDistanceToNow(new Date(workout.createdAt) , {addSuffix : true})}</p>
        <span onClick={handleClick}><RiDeleteBin6Line />
        </span>
    </div>
  )
}
export default  WorkoutDetail