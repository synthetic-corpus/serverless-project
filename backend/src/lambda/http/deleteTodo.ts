import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodo } from '../../businessLogic/todoLogic'
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const todoDeleted = await deleteTodo(todoId)

  if(!todoDeleted){
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Item did not exists or was not deleted'
      })
    };
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }, 
    body: JSON.stringify({
      todoDeleted
    })
  }
}
