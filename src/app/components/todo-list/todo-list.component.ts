import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Itodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoArr !: Array<Itodo>;

  // todoArr$ !: Observable<Array<Itodo>>;
  constructor(
    private _todoService: TodoService
  ) { }

  ngOnInit(): void {
    // this.todoArr$ =  this._todoService.fetchAllTodos();
    this._todoService.fetchAllTodos()
      .subscribe(res => {
        this.todoArr = res
      })

    this._todoService.newTodoAsObs$
      .subscribe(todo => {
        this.todoArr.push(todo)
      })

      this._todoService.updatedTodoAsObs$
        .subscribe(todo => {
          let getIndex = this.todoArr.findIndex(todoobj => todoobj.todoId === todo.todoId);
          this.todoArr[getIndex] = todo;
        })
  }


  onEdit(todo : Itodo){
    console.log(todo);
    this._todoService.editTodoEmit(todo)
  }

  onRemove(todo : Itodo){
   let getConfirm = confirm(`Are you sure you want to remove this todo Object ?`);

   if(getConfirm){
    this._todoService.removeTodo(todo.todoId)
      .subscribe(res => {
        console.log(res); // API call is success
        let getIndex = this.todoArr.findIndex(todoObj => todoObj.todoId === todo.todoId);
        this.todoArr.splice(getIndex, 1)
      })
   }
    
  }

}
