const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'config.env'});
const app=require('./app');

// Setting up database connection---------------------------------------------------
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,// to avoid any deprecation warning
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connection is successful');
})

// listening on the server ---------------------------------------------------------
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
});
