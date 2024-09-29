import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/authUtils";
import User from "../models/User";

const JWT_KEY = process.env.JWT_KEY ?? "JWT_KEY";
const JWT_LIFETIME = process.env.JWT_LIFETIME ?? "60";

export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await User.findOne({ where: { email: email } });

    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({}, JWT_KEY, {
      expiresIn: JWT_LIFETIME,
    });

    return res.status(200).json({
      status: "success",
      message: "Successfuly logged in.",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const verify = (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, JWT_KEY); // Throws JWT errors...

    return res.status(200).json({
      status: "success",
      message: "Token is valid",
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: "unauthorized",
        message: "Token expired",
      });
    }

    // Other types of error
    // console.error(error);

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const refresh = (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, JWT_KEY); // Throws JWT errors...

    const token = jwt.sign({}, JWT_KEY, {
      expiresIn: JWT_LIFETIME,
    });

    return res.status(200).json({
      status: "success",
      message: "Token refreshed",
      newToken: token,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: "unauthorized",
        message: "Token expired",
      });
    }

    // Other types of error
    // console.error(error);

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
