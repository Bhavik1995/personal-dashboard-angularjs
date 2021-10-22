import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo('this is test'),
    new Todo('this is test')
  ]

  constructor() { 
    
  }

  getTodos(){
    return this.todos
  }

  getTodo(id: string){
    this.todos.find(t =>{
      return t.id === id
    })
  }

  addTodo(todo: Todo){
    this.todos.push(todo)
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>){
      const todo = this.getTodo(id)
      Object.assign(todo,updatedTodoFields)
  }

  deleteTodo(id: string){
    const index = this.todos.findIndex(t =>{
       t.id === id

       if(index == -1){
         return this.todos.splice(index, 1)
       }
    })
  }
}
