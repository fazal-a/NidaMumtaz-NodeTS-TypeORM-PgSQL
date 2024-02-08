// src/routes/userRoutes.ts

import express from 'express';
import UserController from '../../controllers/Users/UserController';

const userRouter = express.Router();

userRouter.get('/getUser', UserController.getUser);
userRouter.post('/createUser', UserController.createUser);
userRouter.delete('/delete', UserController.deleteUser);
userRouter.put('/update', UserController.updateUser);
userRouter.get('/login', UserController.loginUser);

// Add other routes for CRUD operations

export default userRouter;