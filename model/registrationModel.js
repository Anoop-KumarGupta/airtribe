const mongoose=require('mongoose');
const validator=require('validator'); 

const registrationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A course must have a name'],
        maxlength:[40, 'A course name must have less than or equal to 40 characters'],
        minlength:[10, 'A course name must have more than or equal to 10 characters'],
    }, 
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    phoneNumber:Number,
    linkedInProfile:String,
    courseId:{
        type:mongoose.Schema.ObjectId,
        ref:'Course'
    },
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:'Instructor'
    }
});


const Registration=mongoose.model('Registration',registrationSchema);
module.exports=Registration;