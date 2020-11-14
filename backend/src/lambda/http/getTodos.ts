import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getTodo } from '../../businessLogic/todoLogic'
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  console.log(event)
  const userId = 'nonsense'
  const getTodos = getTodo(userId)
  console.log(getTodos)
  return {
    statusCode: 203, 
    body: JSON.stringify({getTodos})
  }
}
