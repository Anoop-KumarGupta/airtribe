const Instructor=require('./../model/instructorModel')

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
exports.updateInstructor=(req,res)=>{
    res.status(200).json({
        status:'fail',
        message:'user not found'
    })
};
exports.getInstructor=(req,res)=>{
    res.status(200).json({
        status:'fail',
        message:'user not found'
    })
};