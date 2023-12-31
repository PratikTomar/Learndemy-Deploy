import express, { Request, Response } from "express";
import { Users } from "../models/auth.model";
import jwt from "jsonwebtoken";

const signupUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const isExistingUser = await Users.find({ email });
  if (isExistingUser.length !== 0) {
    return res.status(409).json({
      message: "User with given Email already register",
      status: "fail",
    });
  }
  const user = {
    email,
    password,
    name,
  };
  try {
    await Users.create(user);
    return res.status(200).json({
      message: "User SignedUp successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

const getUserData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = await Users.findOne({ _id: id });
    return res.status(200).json({ status: "success", userData });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      err
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    
    if (user && user.password === password) {
      jwt.sign(
        { userId: user._id, Password: user.password },
        process.env.SECRET_KEY || "OtherSecretKey",
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) return res.status(404).json({ status: "fail", err });
          else return res.json({ token, status: true, user });
        }
      );
    } else {
      return res.status(404).json({ status: "Auth Failed" });
    }
  } catch (error) {
    return res.status(500).json({ status: "Error", error });
  }
};


export { loginUser, signupUser, getUserData };
