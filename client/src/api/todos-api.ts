import { apiEndpoint } from '../config'
import { Todo } from '../types/Todo';
import { CreateTodoRequest } from '../types/CreateTodoRequest';
import Axios from 'axios'
import { UpdateTodoRequest } from '../types/UpdateTodoRequest';

export async function getTodos(idToken: string): Promise<Todo[]> {
  const now = new Date()
  console.log(`Fetching todos at ${now}`)
  console.log('Hearders are ',{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  })

  const response = await Axios.get(`${apiEndpoint}/todos`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Todos:', response.data)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest
): Promise<Todo> {
  const now = new Date()
  console.log(`Creating todos at ${now}`)
  console.log('Hearders are ',{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  })
  const response = await Axios.post(`${apiEndpoint}/todos`,  JSON.stringify(newTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<void> {const now = new Date()
  console.log(`Patching todos at ${now}`)
  console.log('Hearders are ',{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  })
  await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedTodo), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  todoId: string
): Promise<void> {
  const now = new Date()
  console.log(`Deleting todos at ${now}`)
  console.log('Hearders are ',{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  })
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  todoId: string
): Promise<string> {
  const now = new Date()
  console.log(`Getting upload URL at ${now}`)
  console.log('Hearders are ',{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  })
  const response = await Axios.post(`${apiEndpoint}/todos/${todoId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
