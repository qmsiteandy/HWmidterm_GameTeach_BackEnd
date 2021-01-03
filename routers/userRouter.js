const express = require('express');
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require('express');
const { getToken, isAuth } = require("../util");

// userRouter.get(
//   "/seed",
//   expressAsyncHandler(async (req, res) => {
//     await User.deleteMany({});
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
//   })
// );

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { userID, password } = req.body;
    const user = await User.findOne({ userID });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.send({
          _id: user._id,
          userID: user.userID,
          email: user.email,
          name: user.name,
          userInterest: user.userInterest,
          isAdmin: user.isAdmin,
        });
        return;
      }
    }
    res.status(401).send({ message: "無此帳號或密碼錯誤" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { userID, password, email, name } = req.body;
    const user = await User.findOne({userID:req.body.userID});
    if(user){
      res.status(500).send({ message: "此帳號已使用" });
    }
    else
    {
      const user = new User({
        userID,
        password: bcrypt.hashSync(password, 8),
        email,
        name
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        userID: createdUser.userID,
        email: createdUser.email,
        name: createdUser.name,
        userInterest: createdUser.userInterest,
        isAdmin: createdUser.isAdmin,
      });
    } 
  })
);

userRouter.put(
  "/updateAccount",
  expressAsyncHandler(async (req, res) => {
    const { _id, userID, newPassword, newName } = req.body;
    const user = await User.findOne({ userID });
    if (user) {
      user.name =  newName || user.name;
      if (newPassword) {
        user.password = bcrypt.hashSync(newPassword, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        userID: updatedUser.userID,
        email: updatedUser.email,
        name: updatedUser.name,
        userInterest: updatedUser.userInterest,
        isAdmin: updatedUser.isAdmin,
      });
    }
    else{
      res.status(500).send({ message: "帳號找不到" });
    }
  })
);

userRouter.put(
  "/setInterest",
  expressAsyncHandler(async (req, res) => {
    const { userID, userInterest } = req.body;
    const user = await User.findOne({ userID });
    if (user) {
      user.userInterest =  userInterest || user.userInterest;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        userID: updatedUser.userID,
        email: updatedUser.email,
        name: updatedUser.name,
        userInterest: updatedUser.userInterest,
        isAdmin: updatedUser.isAdmin,
      });
    }
    else{
      res.status(500).send({ message: "帳號找不到" });
    }
  })
);

module.exports = userRouter;