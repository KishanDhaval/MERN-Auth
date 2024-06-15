const express = require("express")
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkouts, 
    updateWorkouts
} = require("../controllers/workoutController")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workout
router.get("/" ,getWorkouts)


// GET a single workout
router.get("/:id" ,getWorkout)


// POST a new workout
router.post("/" ,createWorkout)


// DELETE a  workout
router.delete("/:id" ,deleteWorkouts)


// UPDATE a  workout
router.patch("/:id" , updateWorkouts)




// this below is only for understand perpus
// router.get("/hello" , function(req , res){
// this is fire when route is /api/workouts/hello is invoded note that
// })

module.exports = router