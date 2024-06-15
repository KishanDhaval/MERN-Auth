const workoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await workoutModel.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await workoutModel.findById(id);

  if (!workout) {
    return res.status(404).json({ erron: "No such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields =[]
  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0){
    return res.status(400).json({error : 'please fill in all the fields' , emptyFields})
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await workoutModel.create({ title, reps, load , user_id});
    res.status(200).json(workout);
  } 
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkouts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  } 

  const workout = await workoutModel.findByIdAndDelete({_id : id})

  if (!workout) {
    return res.status(404).json({ erron: "No such workout" });
  }
  res.status(200).json(workout)
};

// update a workout
const updateWorkouts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    } 

    const  workout = await workoutModel.findByIdAndUpdate({_id : id } , {
        ...req.body
    })

    
  if (!workout) {
    return res.status(404).json({ erron: "No such workout" });
  }
  res.status(200).json(workout)

};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkouts,
  updateWorkouts
};
