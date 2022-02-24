import Auth0Strategy, { StrategyOption } from 'passport-auth0';
import { auth0domain, clientId, clientSecret } from './config';

const strategyOptions: StrategyOption = {
  domain: auth0domain,
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:4000/callback',
  
}

export const auth0Strategy = new Auth0Strategy(strategyOptions,
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
   console.log("access token", accessToken)
   const customClaims = {
    connection: profile._json['http://danco.cloud/connection'],
    phone_number: profile._json['http://danco.cloud/phone']
   };
  //  const connection = profile._json['http://danco.cloud/connection'];
  //  const phone_number = profile._json['http://danco.cloud/phone'];
    return done(null, { ...profile, accessToken, ...customClaims });
  }
);