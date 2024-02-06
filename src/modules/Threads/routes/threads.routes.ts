import express, {Express} from 'express';
import ThreadsController from "../controllers/threads.controllers";

const threadsRoutes: Express = express();

threadsRoutes.get("/getThreadsList", ThreadsController.fetchThreadsList);
threadsRoutes.get("/getThreadDetails/:id", ThreadsController.fetchThreadDetails);
export default threadsRoutes;