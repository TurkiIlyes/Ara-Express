import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { bodySanitizer, paramsSanitizer } from "../../middlewares/sanitizer";

export const contactUsValidator = [
  bodySanitizer("firstName", "lastName", "email", "message"),
  body("firstName")
    .notEmpty()
    .withMessage("firstName required")
    .isLength({ min: 3 })
    .withMessage("Too short firstName"),
  body("lastName")
    .notEmpty()
    .withMessage("lastName required")
    .isLength({ min: 3 })
    .withMessage("Too short lastName"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("message")
    .notEmpty()
    .withMessage("message required")
    .isLength({ min: 3 })
    .withMessage("Too short message"),
  validatorMiddleware,
];
