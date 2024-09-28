import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateCustomerCreation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("cpf_cnpj")
    .notEmpty()
    .withMessage("CPF/CNPJ is required")
    .matches(/^\d{11}|\d{14}$/)
    .withMessage("Invalid CPF/CNPJ format"),

  body("email").isEmail().withMessage("Invalid email address"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{10,11}$/)
    .withMessage("Invalid phone number format"),

  body("birth_date")
    .notEmpty()
    .withMessage("Birth date is required")
    .isDate()
    .withMessage("Invalid birth date"),

  body("address_city").notEmpty().withMessage("City is required"),

  body("address_country").notEmpty().withMessage("Country is required"),

  body("address_locality").notEmpty().withMessage("Locality is required"),

  body("address_number").notEmpty().withMessage("Address number is required"),

  body("address_postal_code")
    .notEmpty()
    .withMessage("Postal code is required")
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage("Invalid postal code format"),

  body("address_region").notEmpty().withMessage("Region is required"),

  body("address_region_code").notEmpty().withMessage("Region code is required"),

  body("address_street").notEmpty().withMessage("Street is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
