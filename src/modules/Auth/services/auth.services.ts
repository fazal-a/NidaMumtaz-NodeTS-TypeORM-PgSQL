import { oAuth2Client } from "../../../Shared/Utils/OAuth2Clinet";
import { scopes } from "../../../Shared/Utils/OAuth2Clinet"

export let userCredential = null;

export const getAuthorizeUrl = async (): Promise<any> => {

    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    });
};

export const getToken = async (code: string): Promise<any> => {
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        userCredential = tokens;
        return tokens;

    } catch (error: any) {
        return 0;
    }
};