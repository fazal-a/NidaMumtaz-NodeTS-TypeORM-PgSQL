import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../../entities/User';
import UserController from './UserController';
import bcrypt from "bcrypt";
import Joi from "joi";
import RequestResponseMappings from "../../shared/Mappings/RequestResponseMappings";
import jsonwebtoken from "jsonwebtoken";

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

    deleteUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            if (!id) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "User ID is required",
                    400
                );
            }
            const idNumber: number = parseInt(id as string);
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({
                where:
                    {
                        id:idNumber
                    }
            });
            if (!user) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "User not found",
                    404
                );
            }
            await userRepository.remove(user);
            return RequestResponseMappings.sendSuccessMessage(
                res,
                {},
                "User deleted successfully"
            );
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                { error },
                "Failed to delete user",
                500
            );
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body;
            const { id } = req.query;
            const idNumber: number = parseInt(id as string);
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({
                where:
                    {
                        id:idNumber
                    }
            });
            if (!user) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "User not found",
                    404
                );
            }
            user.name = name;
            user.email = email;
            await userRepository.save(user);
            return RequestResponseMappings.sendSuccessMessage(res, user);
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                { error },
                "Failed to update user",
                500
            );
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({
                where:
                    {
                        email:email
                    }
            });
            if (!user) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "User not found",
                    404
                );
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "Invalid credentials",
                    400
                );
            }
            return UserController.sendTokenWithPayload(res, user);
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                { error },
                "Failed to login",
                500
            );
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
