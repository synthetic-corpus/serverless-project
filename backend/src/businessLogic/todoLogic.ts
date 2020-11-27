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
): Promise<TodoItem[]> {
    return databaseAccess.getTodo(userID)
}

/* Add Todo */
export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {

    const todoId = uuid.v4()
    const bucket = process.env.PHOTO_BUCKET
    /* Adding this because CreateTodoRequest has an optional Key */
    const myItem = {
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: `https://${bucket}.s3.amazonaws.com/${todoId}`,
        ...createTodoRequest
    }
    return await databaseAccess.createTodo(myItem)

}

/* Update Todo */
export async function updateTodo(
    updateTodoRequest: UpdateTodoRequest,
    userId: string,
    todoId: string
): Promise<TodoUpdate> {
    return await databaseAccess.updateTodo(updateTodoRequest, userId, todoId)

}

/* Delete Todo */
export async function deleteTodo(
    userId: string,
    todoId: string
): Promise<string>{
    return await databaseAccess.deleteTodo(userId,todoId)
}

/* Get a URL */

export async function getUploadUrl(
    todoId: string
): Promise<string>{
    return await s3Access.getUploadUrl(todoId)
}