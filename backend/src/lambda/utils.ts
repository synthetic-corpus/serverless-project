import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  
  const authorization = event.headers.authorization
  console.log(`Authorization is ${authorization}`)
  const split = authorization.split(' ')
  console.log(`Split is ${split}`)
  const jwtToken = split[1]
  console.log(`Jwt Token is ${jwtToken}`)
  return parseUserId(jwtToken)
}