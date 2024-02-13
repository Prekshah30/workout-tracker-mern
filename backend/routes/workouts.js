const express = require('express');
const Workout = require('../models/workoutModel');
const { createWorkout , getWorkout,getWorkouts, deleteWorkout, updateWorkout}= require('../controllers/workoutController');
const router =express.Router()

//GET all workouts
router.get('/', getWorkouts)
//GET one workout
router.get('/:id',getWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)

module.exports=router

