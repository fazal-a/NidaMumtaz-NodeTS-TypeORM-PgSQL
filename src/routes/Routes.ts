import express,{Express} from 'express';
import userRouter from './Users/routes';
import defaultRoute from "./DefaultRoute/defaultRoute";
import postRouter from "./Posts/routes";
import fileRouter from "./Files/routes";
import downloadContentRouter from "./DownloadContentFromUrls/routes";

const router: Express = express();

router.use('/',defaultRoute);
router.use('/users',userRouter);
router.use('/posts',postRouter);
router.use('/files',fileRouter);
router.use('/content',downloadContentRouter);

export default router;