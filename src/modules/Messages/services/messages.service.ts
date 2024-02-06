import axios from "axios";
import {oAuth2Client} from "../../../Shared/Utils/OAuth2Clinet";


export const fetchMessagesList = async (): Promise<any> => {
    try {
        const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
            headers: {
                Authorization: `Bearer ${oAuth2Client.credentials.access_token}`},
        });
        // console.log("i am in fetch threads list function response.data::",response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error in getting messages::', error.message);
        return null;
    }
}
export const fetchMessageDetails = async (gotID: string): Promise<any> => {
    try {
        const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages/'+gotID, {
            headers: {
                Authorization: `Bearer ${oAuth2Client.credentials.access_token}`},
        });
        return response.data;
    } catch (error: any) {
        console.error('Error in getting message details:', error.message);
        return null;
    }
}
