import { body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { bodySanitizer } from "../../middlewares/sanitizer";

export const signUpValidator = [
  bodySanitizer(
    "name",
    "email",
    "password",
    "passwordConfirm"
  ),
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 20 })
    .withMessage("too long name"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "i"
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    )
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmation required"),
  
  validatorMiddleware,
];

export const signInValidator = [
    bodySanitizer("email", "password"),
    body("email")
      .notEmpty()
      .withMessage("Email required")
      .isEmail()
      .withMessage("Invalid email address"),
  
    body("password")
      .notEmpty()
      .withMessage("Password required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        "i"
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
      ),
    validatorMiddleware,
  ];