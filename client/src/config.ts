// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'dwfdynjdjk'
export const apiEndpoint = `https://cloudapi.joelgonzaga.com/dev`

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-jtg.us.auth0.com',            // Auth0 domain
  clientId: 'r7v0Zdhl3oxgdo4KysS9cQIF4QkE8RMi',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
console.log(authConfig)
