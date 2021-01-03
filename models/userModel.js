const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    //userInterest
    //{0=none, 1=art, 2=program, 3=design, 
    //4=art+program, 5=art+design, 6=program+design, 7=all}
    userInterest:{type: Number, default: 0, required: true},
    userClasses:{type:Array},
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;