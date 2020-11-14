/*import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
*/
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

export class DatabaseAccess {

    /* Not access Database yet. No constructor needed. */
    constructor() {}

    getTodo(userId: string): string[] {
        return [
            'This',
            'Empty',
            'Array',
            userId
        ]
    }

    createTodo(todoItem: TodoItem): TodoItem {
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