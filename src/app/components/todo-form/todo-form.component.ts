import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @ViewChild('todoItem') todoItem !: ElementRef
  constructor(
    private _todoService : TodoService
  ) { }

  ngOnInit(): void {

  }


  onTodoAdd(){
    let newTodo  = {
      todoItem : this.todoItem.nativeElement.value,
    }
    this._todoService.postTodoItem(newTodo)
      .subscribe(res => {
        console.log(res);
      })
  }
}
