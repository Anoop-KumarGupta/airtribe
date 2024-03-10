const Instructor=require('./../model/instructorModel')


// function to get the list of all instructors
exports.getAllInstructors=async (req,res)=>{
    try{
        const instructors=await Instructor.find();
        res.status(200).json({
            status:'success',
            results:instructors.length,
            data:{
                instructors
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
};

// function to get only one instructor details
exports.getInstructor=(req,res)=>{
    res.status(200).json({
        status:'fail',
        message:'user not found'
    })
};
