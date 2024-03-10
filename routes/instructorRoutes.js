const express=require('express');
const router=express.Router();
const instructorController=require('./../controllers/instructorController');
const authController=require('./../controllers/authController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.route('/').get(instructorController.getAllInstructors).post(instructorController.updateInstructor);
router.route('/:instructorID').get(instructorController.getInstructor);
module.exports=router; 