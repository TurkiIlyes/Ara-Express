import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError";
import sendEmail from "../utils/sendEmail";
import contactUsEmailTemplate from "../utils/emailTemplate/contactUsEmailTemplate";

export const contactUs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, message } = req.body;

    try {
      await sendEmail(
        contactUsEmailTemplate(firstName, lastName, email, message)
      );
    } catch (err) {
      return next(new ApiError("There was an error sending the email.", 500));
    }

    res
      .status(200)
      .json({ message: "Your message has been sent successfully." });
  }
);
