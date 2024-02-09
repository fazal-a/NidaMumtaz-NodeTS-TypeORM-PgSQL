import {Request, Response} from "express";
import Joi from "joi";
import RequestResponseMappings from "../../shared/Mappings/RequestResponseMappings";
import {downloadContentsFromUrls} from "../../utils/downloadContentFromUrls";
export default {
    downloadContentFromUrls: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                urls: Joi.array().required(),
            });
            const {error} = schema.validate(req.body);
            if (error) {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {error},
                    "failure in validation of body of your request",
                    400
                )
            }
            const downloadedContentArray = await downloadContentsFromUrls(req.body.urls);
            if (downloadedContentArray.length > 0) {
                return RequestResponseMappings.sendSuccessMessage(res, downloadedContentArray)
            } else {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "failed to download data from the urls",
                    400
                )
            }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in downloading data from files",
                400
            )
        }
    },
}