const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const localdata = require("../localdata.js");
const Course = require("../models/courseModel.js");
const User = require("../models/userModel.js");

const courseRouter = express.Router();

courseRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Course.deleteMany({});
    const createdCourses = await Course.insertMany(localdata.courses);
    res.send({ createdCourses });
  })
);
courseRouter.get(
  "/getCourses",
  expressAsyncHandler(async (req, res) => {
    const courses = await Course.find({});
    res.send({ courses });
  })
);

courseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const course = await Course.findOne(req.params.courseID);
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({ message: "Course Not Found" });
    }
  })
);

courseRouter.put(
  "/reservecourse",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne(req.params.userID);
    const findIndex = FindCourseInArray(user.userClasses, req.params.courseID)

    if (findIndex !== null) {
      res.status(500).send({ message: "此課程已經預約" });
    }else{
      user.userClasses.push(req.params.courseID);
      res.send(user.userClasses);
    }
  })
);

function FindCourseInArray(array, course) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === course) return (i);
  }
  return null;
}

// Function call 


module.exports = courseRouter;
