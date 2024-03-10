const express = require("express");
const courseController = require("./../controllers/courseController");
const router = express.Router();
const authController=require('./../controllers/authController');


 // used multiple middlewares for protecting routes and also for the restrictions
// basic functions of API
router
  .route("/")
  .get(authController.protect,courseController.getAllCourses)
  .post(authController.protect,authController.restricTo('instructor'),courseController.createCourse);
router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(authController.protect,authController.restricTo('instructor'),courseController.deleteCourse);


// extra API functionalities
router.route("/:id/registration").post(authController.protect,authController.restricTo('student'),courseController.registerForCourse);
router.route("/:id/getAllLeads").get(authController.protect,authController.restricTo('instructor'),courseController.getAllLeads);
router.route("/:id/comment").post(authController.protect,authController.restricTo('instructor'),courseController.addComment);
router.route("/:id/:leadId/updateStatus").post(authController.protect,authController.restricTo('instructor'),courseController.updateStatus);

module.exports = router;
