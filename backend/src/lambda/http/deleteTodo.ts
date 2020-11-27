import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodo } from '../../businessLogic/todoLogic'
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log(todoId)
  const todoDeleted = deleteTodo(todoId)
  return {
    statusCode: 203, 
    body: JSON.stringify({
      todoDeleted
    })
  }
}
