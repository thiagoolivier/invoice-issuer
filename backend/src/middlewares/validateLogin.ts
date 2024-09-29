import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateLogin = [
  body("email")
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Invalid email address"),

  body("password")
    .notEmpty().withMessage("Password cannot be empty"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export const validateVerify = [
  body("token")
    .notEmpty().withMessage("Token is required."),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
