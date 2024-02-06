import express, {Express} from 'express';
import MessagesController from "../controllers/messages.controllers";

const threadsRouter: Express = express();

threadsRouter.get("/getMessagesList", MessagesController.fetchMessagesList);
threadsRouter.get("/getMessageDetails/:id", MessagesController.fetchMessageDetails);
export default threadsRouter;