import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { PagBankOrderForm } from "../types";

type Item = PagBankOrderForm["items"][number];

export const validateInvoiceCreation = [
  body("value")
    .notEmpty()
    .withMessage("Value is required.")
    .isNumeric()
    .withMessage("Value must be a number."),

  body("currency")
    .notEmpty()
    .withMessage("Currency is required.")
    .isString()
    .withMessage("Currency must be a string."),

  body("items")
    .isArray()
    .withMessage("Items must be an array.")
    .optional()
    .custom((items: Item[]) => {
      items.forEach((item) => {
        if (typeof item.name !== "string") {
          throw new Error("Item name must be a string.");
        }
        if (typeof item.quantity !== "number") {
          throw new Error("Quantity must be a number.");
        }
        if (typeof item.unit_amount !== "number") {
          throw new Error("Unit amount must be a number.");
        }
      });
      return true;
    }),

  body("shipping")
    .isObject()
    .withMessage("Shipping must be an object.")
    .optional(),

  body("instruction_line1")
    .isString()
    .withMessage("Instruction line 1 must be a string.")
    .optional(),

  body("instruction_line2")
    .isString()
    .withMessage("Instruction line 2 must be a string.")
    .optional(),

  body("charge_description")
    .notEmpty()
    .withMessage("Charge description is required.")
    .isString()
    .withMessage("Charge description must be a string."),

  body("due_date")
    .notEmpty()
    .withMessage("Due date is required.")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Due date must be formatted as YYYY-MM-DD.")
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date."),

  body("client_id")
    .notEmpty()
    .withMessage("Client ID is required.")
    .isNumeric()
    .withMessage("Customer must be an integer."),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
