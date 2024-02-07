
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";


const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "secret";

export const createUser = async (req: Request, res: Response) => {
    try {

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        //check if user already exists
        // const existingUser = await User.findOne({ email: req.body.email });
        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        // const newUser = await User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword,
        // }).save();

        const userRepository = getRepository(User);
        const newUser = userRepository.create(req.body);
        const savedUser = await userRepository.save(newUser);
        res.json({
            message:"Successfully Register",
            data : savedUser,

        }).status(200);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

// Add other CRUD operations (read, update, delete) similarly
