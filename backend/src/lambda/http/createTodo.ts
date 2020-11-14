import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todoLogic'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event)
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  
  /* Implment Authorization here when ready */
  const jwtToken = 'nonsense'

  const newItem = await createTodo(newTodo, jwtToken)

  // TODO: Implement creating a new TODO item
  console.log(newTodo)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem
    })
  }
}
