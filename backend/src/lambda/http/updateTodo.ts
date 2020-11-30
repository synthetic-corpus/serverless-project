import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo } from '../../businessLogic/todoLogic'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger("Update Todo")


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${JSON.stringify(event)}`)
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const update = await updateTodo(updatedTodo, userId, todoId)
  if (!update) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Problem Updating item!'
      })
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ""
  }
}
