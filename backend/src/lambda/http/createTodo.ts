import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todoLogic'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  
  /* Implment Authorization here when ready */
  const userId = getUserId(event)
  const newItem = await createTodo(newTodo, userId)

  if (!newItem.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Items must have a name to be added.'
      })
    };
  }

  // TODO: Implement creating a new TODO item
  console.log(newTodo)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}
