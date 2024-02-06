import  {Request, Response} from "express";
import * as UserService from "../services/User.service";
// GET users

export default {
    getUser: async (req: Request, res: Response) => {
        try {
            const userProfile = await UserService.find();
            if (userProfile) {
                return res.status(200).json(userProfile);
            }
            return res.status(404).json({ error: 'User not found' });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    },
};