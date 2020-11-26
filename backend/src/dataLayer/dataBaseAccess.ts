// import * as AWS  from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'


export class DatabaseAccess {

    /* Not access Database yet. No constructor needed. */
    
    constructor(
        private documentClient = new DocumentClient(),
        private myTable = process.env.TODOS_TABLE,
        private indexName = process.env.INDEX_NAME,
    ) {
        
    }

    async getTodo(userId: string): Promise<TodoItem[]> {
        const inputs = {
            TableName: this.myTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            }
          }
          console.log("*** Data Layer***")
          console.log(inputs)
          const result = await this.documentClient.query(inputs).promise()
          return result.Items as TodoItem[]
          
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        const inputs = {
            TableName: this.myTable,
            Item: todoItem
        }
        
        await this.documentClient.put(inputs).promise()
        return todoItem
    }

    updateTodo(todoUpdate: TodoUpdate, todoId: string): TodoUpdate {
        if(todoId){
            return todoUpdate
        }
    }

    async deleteTodo(userId: string, todoId: string){

        const inputs = {
            TableName: this.myTable,
            Key: {
                userId: userId,
                todoId: todoId
            }
        }
        await this.documentClient.delete(inputs).promise()
        return `Deleted Todo ${todoId}`
    }
}