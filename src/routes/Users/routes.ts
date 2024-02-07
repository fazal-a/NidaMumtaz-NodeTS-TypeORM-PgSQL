// src/routes/userRoutes.ts

import express from 'express';
import { createUser } from '../../controllers/Users/UserController';

const userRouter = express.Router();

userRouter.post('/users', createUser);
// Add other routes for CRUD operations

export default userRouter;