const Instructor=require('./../model/instructorModel');
const jwt=require('jsonwebtoken');
const {promisify}=require('util');


// creating a sign token, which is one part jwt and the other is verification.
const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}


// creating the signup functionality, this function takes the data from the req.body and create a new document
// and token for login purpose and return newly created document
exports.signup=async(req,res,next)=>{
    try{
        const newInstructor=await Instructor.create(req.body);
        const token=signToken(newInstructor._id);
        res.status(201).json({
            status:'success',
            token,
            data:{
                instructor:newInstructor
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        });
    }
}


// creating login functionality using email and password from the req.body, if correct credentials entered then user will be login else give an error message
exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({status:'fail',message:'Please provide email and password'});
        }
    
        const instructor=await Instructor.findOne({email}).select('+password');
        if(!instructor||!(await instructor.correctPassword(password,instructor.password))){
            return res.status(401).json({status:'fail',message:'Incorrect Email or Password!'});
        }
    
        const token=signToken(instructor._id);
        res.status(200).json({
            status:'success',
            token
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:'Please enter correct credentials'
        });
    }
};

// protecting certain routes, so that only authenticated users can access the particular resource.
exports.protect=async (req,res,next)=>{
    //1) getting token and check of it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    } 
    if(!token){
        return res.status(401).json({
            status:'fail',
            message:'You are not logged In. Please log in first.'
        });
    }

    //2) verification token
    let decoded;
    try{
        decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        // console.log(decoded);
    }catch(err){
        return res.status(401).json({ 
            status:'fail',
            message:'login failed.'
        });
    };
    const currUser=await Instructor.findById(decoded.id);
    if(!currUser){
        return res.status(401).json({status:'fail',message:'User belonging to this does not exist'});
    }
    req.user=currUser; 
    console.log(req.user);
    next();
}



// creating this function to restrict the users, so that they can only access the resource which is meant for them.
exports.restricTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({status:'fail',message:'You are not allowed to perform this activity'});
        }
        next();
    }
}
