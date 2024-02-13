import React,{useState,useEffect} from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Workoutform = () => {
const {dispatch}=useWorkoutContext()
const[title,setTitle]=useState('');
const[load,setLoad]=useState('');
const[reps,setReps]=useState('');
const[error,setError]=useState('');
const[emptyFields, setEmptyFields]=useState([])

const handleSubmit= async(e)=>{
    e.preventDefault()

    const workout={title, reps, load}

    const response = await fetch('/api/workouts',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(workout)
    })
    const json = await response.json()

    if(!response.ok){
       setError(json.error)
       setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setTitle('')
        setLoad('')
        setReps('')
        setError(null)
        console.log('new workout added' , json)
        dispatch({type:'CREATE_WORKOUT', payload:json})
    }
}


  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>
        <label>Exercise title:</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className={emptyFields.includes('title')?'error':''}/>
        <label>Load (in kgs):</label>
        <input type="text" value={load} onChange={(e)=>setLoad(e.target.value)} className={emptyFields.includes('load')?'error':''}/>
        <label>Reps:</label>
        <input type="text" value={reps} onChange={(e)=>setReps(e.target.value)}  className={emptyFields.includes('reps')?'error':''}/>

        <button>Add workout</button>
        {error && <div className="error">{error}</div>}

    </form>
    
  )
}

export default Workoutform
