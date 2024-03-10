const express=require('express');
const morgan=require('morgan');

const courseRouter=require('./routes/courseRoutes');
const instructorRouter=require('./routes/instructorRoutes');

const app=express();

// middleware------------------------------------------------------------------------------------------
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'));  // just like hello from middleware
}
app.use(express.json());


//Route handlers---------------------------------------------------------------------------------------
app.use('/api/v1/courses',courseRouter);// mounting the routers
app.use('/api/v1/instructors',instructorRouter);// mounting the routers


//starting server---------------------------------------------------------------------------------------

module.exports=app;




















