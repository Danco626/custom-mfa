function AddCustomClaimsToJWT(user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  const namespace = 'danco.cloud';

	context.idToken[`http://${namespace}/connection`] = context.connection;
  
  if(user.app_metadata.phone) {
    context.idToken[`http://${namespace}/phone`] = user.app_metadata.phone;
  }
  return callback(null, user, context);
}