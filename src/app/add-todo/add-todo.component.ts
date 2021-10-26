import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor(private todoService: TodoService, private router: Router,private notificationService: NotificationService) { }

  showValidationErrors: boolean;

  ngOnInit(): void {

  }

  onFormSubmit(form: NgForm){
    console.log(form)

    if(form.invalid) return this.showValidationErrors = true
    const todo = new Todo(form.value.text)
    this.todoService.addTodo(todo)

    this.notificationService.show("Todo Created")

    this.router.navigateByUrl('/todos')

  }

}
