import express from 'express';
import DownloadContentFromUrlsController from "../../controllers/DownloadContentFromUrls/DownloadContentFromUrlsController";

const downloadContentRouter = express.Router();

downloadContentRouter.get('/downloadContent', DownloadContentFromUrlsController.downloadContentFromUrls);
export default downloadContentRouter;