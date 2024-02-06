import {oAuth2Client} from '../../Shared/Utils/OAuth2Clinet'

export const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'], // Adjust scopes based on your needs
});

console.log('Authorize this app by visiting:', authorizeUrl);

