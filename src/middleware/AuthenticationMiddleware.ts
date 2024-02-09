import {NextFunction, Request, Response} from "express";
import jsonwebtoken from "jsonwebtoken";
import RequestResponseMappings from "../shared/Mappings/RequestResponseMappings";

export default {
    isAuthentication:(req:Request,res:Response,next:NextFunction)=>{
        try{
        let token=req.header('Authorization')?.split(' ')[1]
            req.body.user=jsonwebtoken.verify(token!,process.env.JWT_SECRET_KEY!);
         next();
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,{},e.message,401);
        }
    }
}
