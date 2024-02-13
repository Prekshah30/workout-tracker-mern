// require('dotenv').config();


const express= require('express')
const mongoose=require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/test")

const workoutRoutes=require('./routes/workouts')

const app=express()

//MIDDLEWARE

app.use(express.json())

app.use((req,resp,next)=>{
    console.log(req.path, req.method)
    next()
})

// mongoose.connect(process.env.MONG_URI)
// .then(()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log('Server is running on port',process.env.PORT)
//     })

// })
// .catch((error)=>{
//     console.log(error)
// })

// app.get('/',(req,resp)=>{
//     resp.send('Hello World')
// })

app.use('/api/workouts',workoutRoutes)

app.listen(5000)

