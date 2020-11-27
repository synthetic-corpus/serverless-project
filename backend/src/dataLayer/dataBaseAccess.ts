// import * as AWS  from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'


export class DatabaseAccess {
    
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
          console.log("*** Database Access Layer ***")
          console.log(inputs)
          const result = await this.documentClient.query(inputs).promise()
          return result.Items as TodoItem[]
          
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        const inputs = {
            TableName: this.myTable,
            Item: todoItem
        }
        console.log("*** Database Access Layer ***")
        console.log(inputs)
        await this.documentClient.put(inputs).promise()
        return todoItem
    }

    async updateTodo(todoUpdate: TodoUpdate, userId: string, todoId: string): Promise<TodoUpdate> {
        
        const inputs = {
            TableName: this.myTable,
            Key: {
                userId: userId,
                todoId: todoId
            },
            UpdateExpression: `set #name = :n, #dueDate = :due. #done = :d`, // Update 'instructions' similiar to writing a raw SQL request
            // Provide the variables for the instructions above.
            ExpressionAttributeValues: {
                ':n': todoUpdate.name,
                ':due': todoUpdate.dueDate,
                ':d': todoUpdate.done
            },
            ExpressionAttributeNames: {
                '#name': 'name',
                '#dueDate': 'dueDate',
                '#done': 'done'
            }
        }
        console.log("*** Database Access Layer ***")
        console.log(inputs)
        await this.documentClient.update(inputs).promise()
        return todoUpdate
    }

    async deleteTodo(userId: string, todoId: string){

        const inputs = {
            TableName: this.myTable,
            Key: {
                userId: userId,
                todoId: todoId
            }
        }
        console.log("*** Database Access Layer ***")
        console.log(inputs)
        await this.documentClient.delete(inputs).promise()
        return `Deleted Todo ${todoId}`
    }
}