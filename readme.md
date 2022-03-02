# Custom MFA Enrollment

## Purpose  
This application is used to enroll users in email, sms/voice, and/or TOTP multifactor authentication. Users can login directly or redirect via a redirect rule/action to enroll during authentication. Optionally, the available factors can be managed by connection. 

## Tech  
* **Language**: Typescript  
* **Runtime**: Node > v10  
* **Views**: ejs  
* **Framework**: express  
* **Auth0 SDK**: passport-auth0  

## Rules  

### AddCustomClaimsToJWT  
Adds two custom claims to the id token  
* **http://${namespace}/connection**: The conection authenticated against  
* **http://${namespace}/phone**: Adds the user's phone number if it exists in app_metadata.phone. REQUIRED for sms/voice MFA enrollment.  

### RedirectToMfaEnrollmentApplication  
Checks if the user in enrolled in MFA. If they are, the user is prompted for MFA via the out-of-box Auth0 screens. If the user has not previously enrolled, the user is  redirected to the MFA enrollment application.   

**Note:** Once a user has enrolled in MFA they will NOT be redirected to the enrollment application  


## Auth0 Configuration  
1. Create a new web application in Auth0 named MFA Enrollment  
2. Add `http://localhost:4000/callback` to the allowed callback urls
3. Add `http://localhost:4000` to the allowed logout urls
4. Create a new rule and copy the contents of `./rules/AddCustomClaimsToJWT` and save
    * on line 3, replace the namespace with your own
5. Create a new rule and copy the contents of `./rules/RedirectToMfaEnrollmentApplication` and save  
    * on line 4, replace the client id with the MFA Enrollment client id

## Env Configuration  
Create a .env file at the root directory with the following variables
```
EXPORT_DOMAIN='tenant or custom domain'
CLIENT_ID='client id of MFA enrollment app'
EXPORT_MGMT_API_CLIENT_SECRET='client secret of MFA enrollment app'
AUTH0_CALLBACK_URL='the MFA enrollment apps callback URL'
PORT='port where the MFA enrollment app will run'
SESSION_SECRET='Used to generate the express session id'
CUSTOM_CLAIM_NAMESPACE='namespace used in the AddCustomClaimsToJWT rule'
IS_MFA_BY_CONNECTION='when set to true, the ./config/enabledFactors.ts array is used to display factors based on connection'
```

## Application Configuration
Connection to factors mapping is handled in ./config/enabledFactors.ts. This should be updated to meet the requirements.  

```
[
  { 
    connection: 'Connection1', 
    factors: [Factor.email] 
  }, { 
    connection: 'Connection2', 
    factors: [Factor.sms, Factor.email] 
  }
]
```

## Prerequisites

* Install nodejs  

## Running the App

Install the dependencies.

```bash
npm install
```

Run the app.

```bash
npm start
```
Executing npm start does the following
1. Transpile the typescipt to javascript in the ./dist directory
2. Copies the views into the ./dist directory
3. Starts the server at `localhost:4000`


## Considerations  
- To support email MFA, the recovery code factor must also be enabled. User's who have enrolled in email MFA without recovery code enabled, will always be redirected to the mfa enrollment app until the user enrolls in a more secure factor. This happens because the `user.multifactor` array is empty.  