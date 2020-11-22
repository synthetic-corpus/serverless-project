// import * as AWS  from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const documentClient = new DocumentClient
export class DatabaseAccess {

    /* Not access Database yet. No constructor needed. */
    myTable: string
    indexName: string
    constructor() {
        this.myTable = process.env.TODOS_TABLE
        this.indexName = process.env.INDEX_NAME
    }

    async getTodo(userId: string): Promise<TodoItem[]> {
        /*const inputs = {
            TableName: this.myTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            }
          }
          const result = await documentClient.query(inputs).promise()
          return result.Items as TodoItem[]*/
          console.log(userId)
          return []
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        const inputs = {
            TableName: this.myTable,
            Item: todoItem
        }
        
        await documentClient.put(inputs).promise()
        return todoItem
    }

    updateTodo(todoUpdate: TodoUpdate, todoId: string): TodoUpdate {
        if(todoId){
            return todoUpdate
        }
    }

    deleteTodo(todoId: string){
        return(`Imagine Deleting ${todoId}`)
    }
}