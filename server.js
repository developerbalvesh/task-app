const express = require('express');
const dotenv = require('dotenv');
const monran = require('morgan');
const connectDB = require('./config/db.js');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes.js')
const taskRoutes = require('./routes/taskRoute.js')

// config dotenv
dotenv.config();
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// route for authentication
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/task', taskRoutes)

// post request
app.get('/',(req, res)=>{
    res.send({
        message:"got a get request"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("server is now running")
})