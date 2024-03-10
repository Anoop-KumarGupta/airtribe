const fs=require('fs');
const Course=require('./../model/courseModel');
const Registration=require('./../model/registrationModel');


exports.getAllCourses=async (req,res)=>{
    try{
        const courses=await Course.find();
        res.status(200).json({
            status:'success',
            results:courses.length,
            data:{
                courses
            }
        });
    }catch(err){
        res.status(400).json({ 
            status:'fail',
            message:err
        });
    }
};

exports.createCourse=async (req,res)=>{
    try{
        const newCourse=await Course.create({
            name:req.body.name,
            max_seat:req.body.max_seat,
            start_date:req.body.start_date,
            owner:req.user.id,
            lead:req.user.id
        });
        res.status(200).json({
            status:'success',
            data:{
                course:newCourse
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
};


exports.getCourse=async(req,res,next)=>{
    try{
        const course=await Course.findById(req.params.id).populate('owner');
        res.status(200).json({
            status:'success',
            data:{
                course
            }
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};
exports.updateCourse=async (req,res)=>{
    try{
        const course=await Course.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:"success",
            data:{
                course
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};


exports.deleteCourse=async(req,res)=>{
    try{
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:'success',
            data:null
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}

exports.registerForCourse=async(req,res)=>{
    try{
        const course=await Course.findById(req.params.id);
        const newRegistration=await Registration.create({
            name:req.body.name,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            linkedInProfile:req.body.linkedInProfile,
            courseId:req.params.id,
            studentId:req.user.id
        });
        course.leads.push({
            student:req.user.id,
            status:"pending"
        });
        await course.save();
        res.status(200).json({
            status:'success',
            message:'registration successful',
            data:newRegistration
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}



exports.getAllLeads = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                leads:course.leads
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};


exports.addComment=async(req,res)=>{
    try {
        const course = await Course.findById(req.params.id);
        course.comments.push(req.body.comments);
        await course.save();
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
}


exports.updateStatus=async(req,res)=>{
    try {
        await Course.updateOne(
            { _id: req.params.id, 'leads._id': req.params.leadId },
            { $set: { 'leads.$.status': req.body.status } } 
        );
        res.status(200).json({
            status: 'success',
            message: 'Lead status updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
}
