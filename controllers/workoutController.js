const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

/**Get All */
const getAllWorkout = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

/**Get Single */
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workouts" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(404).json({ error: "No Workouts found by this", id });
  }
  res.status(200).json(workout);
};

/**POST DATa */
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = []

  if(!title){
    emptyFields.push("Title")
  }
  if(!reps){
    emptyFields.push("reps")
  }
  if(!load){
    emptyFields.push("load")
  }
  
  if(emptyFields.length > 0){
    return res.status(400).json({error: "Please fill in all the fields", emptyFields})
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/**Delete Data */
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workouts" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    res.status(404).json({ error: "No Workouts found by this", id });
  }
  res.status(200).json(workout);
};

/**Update Data */
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workouts" });
  }
  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    res.status(404).json({ error: "No Workouts found by this", id });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
