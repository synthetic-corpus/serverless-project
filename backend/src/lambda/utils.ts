import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  console.log(event)
  const authorization = event.headers.Authorization
  console.log(`My authorization is ${authorization}`)
  const split = authorization.split(' ')
  console.log(`my split is ${split}`)
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}