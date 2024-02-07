import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../../entities/User';
import UserController from './UserController';
import bcrypt from "bcrypt";
import Joi from "joi";
import RequestResponseMappings from "../../shared/Mappings/RequestResponseMappings";
import jsonwebtoken from "jsonwebtoken";


const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "secret";

export default {
    getUser: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
            });
            const {error} = schema.validate(req.body);
            if (error) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {error},
                    "failure in validation of email",
                    400
                )
            }
            const userRepository = getRepository(User);
            const existingUser = await userRepository.findOne({
                where:
                    {
                        email:req.body.email
                    }
            });
            if (existingUser) {
                return RequestResponseMappings.sendSuccessMessage(res, existingUser)
            } else {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "failure in getting user against email",
                    400
                )
            }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in validation of email",
                400
            )
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            });
            const {error} = schema.validate(req.body);
            if (error) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {error},
                    "failure in validation of body object schema",
                    400
                )
            }
            //check if user already exists
            const userRepository = getRepository(User);
            const existingUser = await userRepository.findOne({
                where:
                    {
                        email:req.body.email
                    }
            });
            if (existingUser) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "User Already exists against the email",
                    400
                )
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create new user
            const newUser = userRepository.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            const savedUser = await userRepository.save(newUser);
            return UserController.sendTokenWithPayload(res, savedUser);
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "Failed to create user",
                500
            )
        }
    },

    sendTokenWithPayload: (res: Response, user: User) => {
        return RequestResponseMappings.sendSuccessMessage(res, {
            token: jsonwebtoken.sign(
                {email: user.email, password: user.password},
                process.env.JWT_SECRET_KEY|| "secret"),
            user: user
        })
    },
}
