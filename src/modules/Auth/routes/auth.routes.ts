import express, {Express} from 'express';
import AuthController from "../controllers/auth.controllers";

const authRouter: Express = express();

authRouter.get("/getAuthorizeUrl", AuthController.getAuthorizeUrl);
authRouter.post("/getToken", AuthController.getToken);
export default authRouter;