import { body, param } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { bodySanitizer, paramsSanitizer } from "../../middlewares/sanitizer";

export const createProjectValidator = [
  bodySanitizer("name", "image", "type"),
  body("name")
    .notEmpty()
    .withMessage("Project required")
    .isLength({ min: 3 })
    .withMessage("Too short project name"),
  body("image").optional().isString().withMessage("Invalid project image"),
  body("type")
    .optional()
    .isIn(["MDTR", "GDEE"])
    .withMessage("Invalid project type"),
  validatorMiddleware,
];

export const deleteProjectValidator = [
  paramsSanitizer("id"),
  param("id").isMongoId().withMessage("Invalid project id format"),
  validatorMiddleware,
];
