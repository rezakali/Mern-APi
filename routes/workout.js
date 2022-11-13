const express = require("express");
const Workout = require("../models/workoutModel");
const router = express.Router();
const { createWorkout, getAllWorkout, getWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");

/** GET ALL DATA */
router.get("/", getAllWorkout);

/** GET Single DATA */
router.get("/:id", getWorkout);

/** Post DATA */
router.post("/", createWorkout);

/** Delete  DATA */
router.delete("/:id", deleteWorkout);

/** Update  DATA */
router.patch("/:id", updateWorkout);

module.exports = router;
