import express, {Express} from 'express';
import UserController from "../controllers/user.controllers";

const userRouter: Express = express();

userRouter.get("/getUser", UserController.getUser);
export default userRouter;