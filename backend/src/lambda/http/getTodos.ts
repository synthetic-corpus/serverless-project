import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getTodo } from '../../businessLogic/todoLogic'
import { getUserId } from '../utils'
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.debug("The Headers are...,",event.headers)
  const userId = getUserId(event)
  const getTodos = await getTodo(userId)
  
  return {
    statusCode: 200, 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({items: getTodos})
  }
}
