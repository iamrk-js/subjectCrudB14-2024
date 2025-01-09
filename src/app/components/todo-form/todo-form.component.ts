import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @ViewChild('todoItem') todoItem !: ElementRef;
  todoObj !: Itodo;
  constructor(
    private _todoService : TodoService
  ) { }

  ngOnInit(): void {
    this._todoService.editTodoAsObs$
      .subscribe(todo => {
        this.todoObj = todo;
        this.todoItem.nativeElement.value = todo.todoItem;
      })
  }


  onTodoAdd(){
    let newTodo : any  = {
      todoItem : this.todoItem.nativeElement.value,
    }
    this.todoItem.nativeElement.value = '';
    this._todoService.postTodoItem(newTodo)
      .subscribe(res => {
        newTodo.todoId = res.name;
        this._todoService.newTodoObjEmit(newTodo)
      })
  }
}
