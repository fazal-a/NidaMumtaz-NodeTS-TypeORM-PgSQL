import {Request, Response} from "express";
import * as AuthService from "../services/auth.services";

export default {
    getAuthorizeUrl: async (req: Request, res: Response) => {
        try {
            const authorizeUrl: String = await AuthService.getAuthorizeUrl();
            console.log('success authorizeUrl::', authorizeUrl)
            res.status(200).json({"url": authorizeUrl});
        } catch (e: any) {
            console.log('failure getting authorizeUrl error::', e)
            res.status(500).send(e.message);
        }
    },

    getToken: async (req: Request, res: Response) => {
        try {
            const {code} = req.body;
            console.log("authCode ::", code)
            if (code) {
                const tokens: String = await AuthService.getToken(code);
                console.log('success token::', tokens)
                res.status(200).json(tokens);

            } else {
                res.status(500).send('failure in getting tokens');

            }
        } catch (e: any) {
            console.log('failure in in getting token error::', e)
            res.status(500).send(e.message);
        }
    },
};