const Workout = require('../models/workoutModel');
const mongoose = require ('mongoose')

//create new workout

const createWorkout= async(req,resp)=>{
    const{title, load,reps}=req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length>0){
        return resp.status(400).send({error:'Please fill in all the fields', emptyFields})
    }

    try{
     let workout=  new Workout({title,load,reps})
     await workout.save()
     resp.status(200).send(workout)
    }
    catch(error){
      resp.status(400).send({error:error.message})
    }
}

//get all workouts

const getWorkouts = async(req,resp)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    resp.status(200).json(workouts)
}

//get a single workout

const getWorkout = async (req,resp)=>{
 const {id} = req.params

 if(!mongoose.Types.ObjectId.isValid(id)){
    return resp.status(404).json({error:'No such workout'})
 }

 const workout = await Workout.findById(id)

 if(!workout){
    return resp.status(404).json({error:'No such Workout'})
 }
 resp.status(200).json(workout)
}

//delete

const deleteWorkout =async(req,resp)=>{
    const{id} =req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return resp.status(404).json({error:"no such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return resp.stauts(404).json({error:"no such workout"})
    }

    resp.status(200).json(workout)

}

//update a workout
const updateWorkout=async(req,resp)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        resp.status(404).json({error:"no such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!workout){
        resp.status(404).json({error:"no such workout"})
    }

    resp.status(200).json(workout)
}

module.exports ={
    createWorkout, getWorkout,getWorkouts,deleteWorkout,updateWorkout
}