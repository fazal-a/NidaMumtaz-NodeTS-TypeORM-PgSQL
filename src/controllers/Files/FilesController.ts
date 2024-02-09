import {Request, Response} from "express";
import Joi from "joi";
import RequestResponseMappings from "../../shared/Mappings/RequestResponseMappings";
import {getFileContent, listFilesWithExtension} from "../../utils/fileServices";
import path from "path";

export default {
    listFiles: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                fileExtension: Joi.string().required(),
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
            let directoryPath = '/files'
            const filesWithExtension = listFilesWithExtension(directoryPath, req.body.fileExtension);
            if (filesWithExtension.length > 0) {
                return RequestResponseMappings.sendSuccessMessage(res, filesWithExtension)
            } else {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "No file exists",
                    400
                )
            }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in fetching files extensions",
                400
            )
        }
    },

    getFileContent: async (req: Request, res: Response) => {
        try {
            const schema = Joi.object({
                fileName: Joi.string().required(),
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
            const fileExtension = path.extname(req.body.fileName).toLowerCase();
            let directoryPath = '/files'
            const fileContentBuffer = getFileContent(directoryPath, req.body.fileName);
            let contentType = '';
            if (fileExtension === '.pdf') {
                contentType = 'application/pdf';
            } else if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
                contentType = 'image/jpeg';
            }
            if (fileContentBuffer && contentType) {
                return RequestResponseMappings.sendSuccessMessage(res.setHeader('Content-Type', contentType), fileContentBuffer)
            } else if (fileContentBuffer && !contentType) {
                return RequestResponseMappings.sendSuccessMessage(res, fileContentBuffer.toString())
            } else {
                return RequestResponseMappings.sendErrorMessage(
                    res,
                    {},
                    "No data found",
                    400
                )
            }
        } catch (error) {
            return RequestResponseMappings.sendErrorMessage(
                res,
                {error},
                "failure in fetching file content",
                400
            )
        }
    },
}