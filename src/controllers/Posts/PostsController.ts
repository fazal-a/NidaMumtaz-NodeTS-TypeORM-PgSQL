import {Request, Response} from "express";
import User from "../../entities/User";
import Post from "../../entities/Post";
import RequestResponseMappings from "../../shared/Mappings/RequestResponseMappings";
import {getRepository} from "typeorm";
import Joi from "joi";

export default {
    addPost:async (req: Request, res: Response) => {
        try {
        const schema = Joi.object({
            postTitle: Joi.string().required(),
            user: Joi.object().required(),
            postDescription: Joi.string().required(),
        });
        const {error} = schema.validate(req.body);
        if (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in validation of body of your request",
                400
            )
        }
        const postRepository = getRepository(Post);
        const userRepository = getRepository(User);
        const existingUser = await userRepository.findOne({
            where:
                {
                    email:req.body.user.email
                }
        });

        if(existingUser){
            const newPost = postRepository.create({
                postTitle: req.body.postTitle,
                user: req.body.user.id,
                postDescription: req.body.postDescription
            });
            const savedPost = await postRepository.save(newPost);
            return RequestResponseMappings.sendSuccessMessage(res,savedPost);
        }else{
            return RequestResponseMappings.sendErrorMessage(
                res,
                {},
                "failure in fetching user",
                400
            )
        }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "Failed to add post",
                500
            )
        }
    },

    getAllPost: async (req: Request, res: Response) => {
        try {
            const postRepository = getRepository(Post);
            const existingPosts = await postRepository.find({ relations: ["user"] });
            console.log("existingPosts:::",existingPosts)
            if (existingPosts) {
                return RequestResponseMappings.sendSuccessMessage(res, existingPosts)
            } else {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "failure in getting all posts",
                    400
                )
            }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in fetching posts",
                400
            )
        }
    },

    getPost: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({id: Joi.number().required()});
            const {error} = schema.validate({id:req.query.id});
            if (error) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {error},
                    "failure in validation of post id",
                    400
                )
            }
            const postRepository = getRepository(Post);
            const existingPost = await postRepository.findOne({
                where:
                    {
                        id:parseInt(req.query.id as string)
                    }
            });
            if (existingPost) {
                return RequestResponseMappings.sendSuccessMessage(res, existingPost)
            } else {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "failure in getting post against id",
                    400
                )
            }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in fetching post",
                400
            )
        }
    },

    updatePost: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({id: Joi.number().required()});
            const { postTitle, postDescription } = req.body;
            const idNumber: number = parseInt(req.query.id as string);
            const {error} = schema.validate({id:idNumber});
            if (error) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {error},
                    "failure in fetching id from query",
                    400
                )
            }
            const postRepository = getRepository(Post);
            const post = await postRepository.findOne({
                where:
                    {
                        id:idNumber
                    }
            });
            if (!post) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "Post not found",
                    404
                );
            }
            post.postTitle = postTitle;
            post.postDescription = postDescription;
            await postRepository.save(post);
            return RequestResponseMappings.sendSuccessMessage(res, post);
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                { error },
                "Failed to update post",
                500
            );
        }
    },

    deletePost: async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
            if (!id) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "Post ID is required",
                    400
                );
            }
            const idNumber: number = parseInt(id as string);
            const postRepository = getRepository(Post);
            const post = await postRepository.findOne({
                where:
                    {
                        id:idNumber
                    }
            });
            if (!post) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "Post not found",
                    404
                );
            }
            await postRepository.remove(post);
            return RequestResponseMappings.sendSuccessMessage(
                res,
                {},
                "Post deleted successfully"
            );
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                { error },
                "Failed to delete post",
                500
            );
        }
    },
}