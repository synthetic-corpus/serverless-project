import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

export class DatabaseAccess {

    /* Not access Database yet. No constructor needed. */
    constructor() {}

    createTodo(todoItem: TodoItem): TodoItem {
        return todoItem
    }

    updateTodo(todoUpdate: TodoUpdate, todoId: string): TodoUpdate {
        if(todoId){
            return todoUpdate
        }
    }
}