import express,{Express} from 'express';
import userRouter from './Users/routes';
import defaultRoute from "./DefaultRoute/defaultRoute";

const router: Express = express();

router.use('/',defaultRoute);
router.use('/users',userRouter);

export default router;