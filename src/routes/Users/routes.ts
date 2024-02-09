import express from 'express';
import UserController from '../../controllers/Users/UserController';
import AuthenticationMiddleware from "../../middleware/AuthenticationMiddleware";

const userRouter = express.Router();

userRouter.get('/getUser', UserController.getUser);
userRouter.post('/createUser', UserController.createUser);
userRouter.delete('/delete',AuthenticationMiddleware.isAuthentication, UserController.deleteUser);
userRouter.put('/update',AuthenticationMiddleware.isAuthentication, UserController.updateUser);
userRouter.get('/login', UserController.loginUser);

export default userRouter;