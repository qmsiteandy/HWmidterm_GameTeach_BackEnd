const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseID: { type: Number, default: 0, required: true },
  interestType: { type: Number, default: 0, required: true },
  coursename: { type: String, required: true },
  teacher: { type: String, required: true },
  teacherImage: { type: String, required: true },
  period: { type: String, required: true },
  time: { type: String, required: true },
  bookedNum: { type: Number, default: 0, required: true },
  bookedNumMax: { type: Number, default: 0, required: true },
});

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;