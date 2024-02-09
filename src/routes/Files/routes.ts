import express from 'express';
import FilesController from "../../controllers/Files/FilesController";

const fileRouter = express.Router();

fileRouter.get('/getFiles', FilesController.listFiles);
fileRouter.get('/fileContent', FilesController.getFileContent);
export default fileRouter;