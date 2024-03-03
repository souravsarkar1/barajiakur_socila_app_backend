import { registrationEmail } from './../../utils/authentication/registrationEmail';
import { generateRandom4DigitNumber } from '../../utils/authentication/otp';
import { SECRET } from '../../config';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../loaders/logger";
import createAPIError from "../../utils/error";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "../../models/user";
import jwt from "jsonwebtoken";
import sendMail from '@/utils/authentication/nodemailer';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
        const otp = generateRandom4DigitNumber();
        const mailBody = registrationEmail(name, otp);
        sendMail(email,"'Welcome to Your App! 🚀',", mailBody);
    if(!email || !password || !name){
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please Fill All The Required Field!" });
    }
    // Check if the user is already registered
    const isUserRegistered: IUser | null = await UserModel.findOne({ email });

    if (isUserRegistered) {
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Already registered! Please Login!",
      });
    }

    // Hash the password
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        throw new Error("Error hashing password");
      }

      // Create a new user
      const newUser = new UserModel({
        name,
        email,
        password: hash,
      });

      // Save the user to the database
      await newUser.save();

      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: "User registered successfully!" });
    });
  } catch (error) {
    const errorMessage = error.message || error;
    logger.error(errorMessage);
    return createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage, res);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user: IUser | null = await UserModel.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    // Send the token in the response
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    const errorMessage = error.message || error;
    logger.error(errorMessage);
    return createAPIError(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage, res);
  }
};
