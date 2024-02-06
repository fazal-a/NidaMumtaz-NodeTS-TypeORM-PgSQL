const { google } = require('googleapis');

export const oAuth2Client = new google.auth.OAuth2({
  clientId: '858871017230-f7qoe7dpqj202r3p6ucrca3g8jrgj176.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'http://localhost:3000/login',
}
);
export const scopes = [
  'https://www.googleapis.com/auth/gmail.readonly'
];
