import express from 'express';
import PostController from '../../controllers/Posts/PostsController';
import AuthenticationMiddleware from "../../middleware/AuthenticationMiddleware";

const postRouter = express.Router();

postRouter.post('/addPost',AuthenticationMiddleware.isAuthentication, PostController.addPost);
postRouter.get('/getPost',AuthenticationMiddleware.isAuthentication, PostController.getPost);
postRouter.get('/', PostController.getAllPost);
postRouter.put('/update',AuthenticationMiddleware.isAuthentication, PostController.updatePost);
postRouter.delete('/delete',AuthenticationMiddleware.isAuthentication, PostController.deletePost);
export default postRouter;