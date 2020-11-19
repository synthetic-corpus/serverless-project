// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'dwfdynjdjk'
export const apiEndpoint = `https://${apiId}.execute-api.us-west-2.amazonaws.com/dev`

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.envAUTH0_CLIENT_ID
export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: AUTH0_DOMAIN,            // Auth0 domain
  clientId: AUTH0_CLIENT_ID,          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
