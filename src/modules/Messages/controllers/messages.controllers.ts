import {Request, Response} from "express";
import * as MessagesServices from "../services/messages.service";

export default {
    fetchMessagesList: async (req: Request, res: Response) => {
        try {
            console.log("i am in fetch threads list controller start");
            const tokens = req.body.tokens;
            const messagesList = await MessagesServices.fetchMessagesList();
            console.log("messagesList::", messagesList)
            if (messagesList) {
                res.status(200).json(messagesList);
            } else {
                res.status(404).json({error: "failure in fetching messages List"});
            }
            console.log("i am in fetch messages List controller end");
        } catch (e: any) {
            res.status(500).json({error: e.message});
        }
    },
    fetchMessageDetails: async (req: Request, res: Response) => {
        try {
            console.log("i am in fetch message detail controller start");
            const gotID = req.params.id;
            const tokens = req.body.tokens;

            console.log("i am in fetch threads detail gotID::", gotID);
            const messageDetails = await MessagesServices.fetchMessageDetails(gotID);
            console.log("threadDetails::", messageDetails)
            if (messageDetails) {
                res.status(200).json(messageDetails);
            } else {
                res.status(404).json({error: "failure in fetching message details controller response"});
            }
            console.log("i am in fetch message details controller end");
        } catch (e: any) {
            res.status(500).json({error: e.message});
        }
    }

};