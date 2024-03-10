const mongoose=require('mongoose');
const validator=require('validator'); 
const { default: slugify } = require('slugify');


// schema for the courses 
const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A course must have a name'],
        maxlength:[40, 'A course name must have less than or equal to 40 characters'],
        minlength:[10, 'A course name must have more than or equal to 10 characters'],
    }, 
    max_seats:{
        type:Number,
        default:20
    },
    start_date:{
        type:String,
        required:[true,'Please mention start date']
    },
    slug:String,
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'Instructor'
    },
    leads:[{
        student:{
            type:mongoose.Schema.ObjectId,
            ref:'Instructor'
        },
        status:{
            type:String,
            default:"pending"
        }
    }],
    comments:[String]
});


// document middleware which will execute just before saving the document to the database
courseSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true});
    next();
});

const Course=mongoose.model('Course',courseSchema);
module.exports=Course;
