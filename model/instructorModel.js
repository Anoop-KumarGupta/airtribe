const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

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

instructorSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};

const Instructor=mongoose.model('Instructor',instructorSchema);
module.exports=Instructor;