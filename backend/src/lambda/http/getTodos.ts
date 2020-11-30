import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getTodo } from '../../businessLogic/todoLogic'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger("Get Todo")

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  //console.debug("The Headers are...,",event.headers)
  const userId = getUserId(event)
  const getTodos = await getTodo(userId)
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${JSON.stringify(event)}`)
  if (!getTodos){
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Could Not Retrieve items!'
      })
    }

  }

  return {
    statusCode: 200, 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({items: getTodos})
  }
}
