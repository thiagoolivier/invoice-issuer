import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY;

export const login = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'This is a testing message.'
    })
}