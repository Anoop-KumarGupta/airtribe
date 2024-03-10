const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'config.env'});// important to use it before requiring app because we need to read environment variables before app
const app=require('./app');

// Setting up database connection---------------------------------------------------
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,// to avoid any deprecation warning
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})// this will return a promise
.then(()=>{
    console.log('Connection is successful');
})


const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
});