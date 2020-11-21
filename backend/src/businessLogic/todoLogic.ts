/* 
    Models are for interfacing with the data layer.
    Expect the Data Layer to Return something that matches these interfaces.
*/
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
/* 
    Request Interfaces are used by the HTTP layer. Expect the paramaters of 
    incoming functions to be interfaced as such.
*/
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

/* Functions from the Data Layer. Which does nothing right now */
import { DatabaseAccess } from '../dataLayer/databaseAccess'
import { S3Access } from '../dataLayer/s3Access'

import * as uuid from 'uuid'

const databaseAccess = new DatabaseAccess()
const s3Access = new S3Access

/* Get Todos */
export async function getTodo(
    userID: string
): Promise<string[]> {
    return databaseAccess.getTodo(userID)
}

/* Add Todo */
export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    jwtToken: string
): Promise<TodoItem> {

    const todoID = uuid.v4()
    const userID = jwtToken

    return await databaseAccess.createTodo({
        userId: userID,
        todoId: todoID,
        createdAt: new Date().toISOString(),
        name:  createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
    })

}

/* Update Todo */
export async function updateTodo(
    updateTodoRequest: UpdateTodoRequest,
    todoId: string
): Promise<TodoUpdate> {
    return await databaseAccess.updateTodo(updateTodoRequest, todoId)

}

/* Delete Todo */
export async function deleteTodo(
    todoId: string
): Promise<string>{
    return await databaseAccess.deleteTodo(todoId)
}

/* Get a URL */

export async function getUploadUrl(
    todoId: string
): Promise<string>{
    return await s3Access.getUploadUrl(todoId)
}