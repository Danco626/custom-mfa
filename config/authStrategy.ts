import Auth0Strategy, { StrategyOption } from 'passport-auth0';
import { auth0domain, clientId, clientSecret, customClaimNamespace } from './config';

const strategyOptions: StrategyOption = {
  domain: auth0domain,
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:4000/callback'  
}

export const auth0Strategy = new Auth0Strategy(strategyOptions,
  function (accessToken, refreshToken, extraParams, profile, done) {       

   const customClaims = {
    connection: profile._json[`http://${customClaimNamespace}/connection`],
    phone_number: profile._json[`http://${customClaimNamespace}/phone`]
   };
     
    return done(null, { ...profile, accessToken, ...customClaims });
  }
);