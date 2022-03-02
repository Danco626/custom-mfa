function RedirectToMfaEnrollmentApplication(user, context, callback) {
  
  //skip redirect and MFA prompt when logging into the MFA enrollment application
 if (context.protocol === "redirect-callback" || context.clientID === "mDg1qO2xQpQOLDIjtkFKgZE2qEwtFUFe"){ 
   return callback(null, user, context);
 }
  
  //initialize and check if the user has existing MFA factors. If they don't redirect the user to the app  to enroll
 user.multifactor = user.multifactor || [];
 if (user.multifactor.length === 0) {
   context.redirect = {
    url: "http://localhost:4000/login"
  };
 } else { //users who have already enrolled in MFA can be prompted using the default Auth0 screens
 	context.multifactor = {
      provider: 'any',
      // ensure that we will prompt MFA, even if the end-user has selected to 
      // remember the browser.
      allowRememberBrowser: false
    };
 }
  
  return callback(null, user, context);
}