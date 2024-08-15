import User from "../models/User";

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken";

import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser && checkUser.status === "active") {
      return next(new ApiError("email already exist", 400));
    }
    if (checkUser && checkUser.status === "inactive") {
      await User.findOneAndDelete({ email });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, +process.env.BCRYPT_SALT),
     
    });

    res.status(201).json({
      status: "success",
      message: "user created",
      data: { email: user.email },
    });
  }
);

export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      user.status === "inactive" ||
      !(user.role === "admin")
    ) {
      return next(new ApiError("Invalid email or password", 401));
    }
    const token = generateToken(user._id);
    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json({ data: userObject, token });
  }
);

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || null;
    if (!token) {
      return next(new ApiError("You are not login, please login -_-", 401));
    }

    interface decodedTokenType {
      userId: string;
      iat: number;
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as decodedTokenType;

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return next(new ApiError("user with this token no more exist -_-", 401));
    }
    req.user = user;
    next();
  }
);

export const allowedTo = (...roles: string[]) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && !roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
