import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/Routes";
import connection from "./helper/connection";

dotenv.config();

const router: Express = express();
router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.use('/', routes);

router.use((req: Request, res:Response, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

router.use((req:Request, res:Response, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const PORT = process.env.PORT || 5000;

connection.then(() => {
    router.listen(PORT, () => {
        console.log(`The server is running on the port ${PORT}`)
    });
}).catch((error) => {
    console.error('Error connecting to PostgreSQL database:', error);
});