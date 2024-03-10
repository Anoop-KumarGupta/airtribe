const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');


// schema for users --> there are two different types of users, one is instructor and other one is student. role property in the schema is used for distinguish between both
const instructorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Must have a name']
    },
    teachingExperience:Number,
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    role:{
        type:String,
        enum:['instructor','student'],
        default:'instructor'
    },
    password:{
        type:String,
        required:[true,'please provide a password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true, 'please confirm your password'],
        validate:{
            validator:function(el){
                return el==this.password;
            },
            message:'Password do not match'
        }
    }
});

// document middlewares------------------------
instructorSchema.pre('save', function(next) {
    if (this.role === 'student') {
        this.teachingExperience = undefined;
    }
    next();
});

instructorSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
});


// for loggin purpose, here we are comparing the entered password by user and the password which we have already. Since password stored is encrypted form so we cannot compare directly but use bcrypt 
instructorSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

// creating the model using instructorSchema
const Instructor=mongoose.model('Instructor',instructorSchema);

// exporting the model, so that it can be used in other files
module.exports=Instructor;
