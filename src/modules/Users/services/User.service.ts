import axios from "axios";
import {oAuth2Client} from "../../../Shared/Utils/OAuth2Clinet";

export const find = async (): Promise<any> => {
    try {

        const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
            headers: {
                Authorization: `Bearer ${oAuth2Client.credentials.access_token}`},
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching user details:', error.message);
        return null;
    }
};
