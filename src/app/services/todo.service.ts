import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Itodo } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  BASE_URL = `${environment.baseUrl}`
  TODOS_URL = `${this.BASE_URL}/todos.json`

  private newTodoSub$: Subject<Itodo> = new Subject<Itodo>();
  private editTodoSub$: Subject<Itodo> = new Subject<Itodo>();
  private updatedTodoSub$: Subject<Itodo> = new Subject<Itodo>();

  newTodoAsObs$: Observable<Itodo> = this.newTodoSub$.asObservable();
  editTodoAsObs$: Observable<Itodo> = this.editTodoSub$.asObservable();
  updatedTodoAsObs$ : Observable<Itodo> = this.updatedTodoSub$.asObservable()

  constructor(
    private _http: HttpClient
  ) { }

  updatedTodoObjEmit(todo : Itodo){
    this.updatedTodoSub$.next(todo);
  }

  newTodoObjEmit(todo: Itodo) {
    this.newTodoSub$.next(todo)
  }

  editTodoEmit(todo: Itodo) {
    this.editTodoSub$.next(todo);
  }

  fetchAllTodos(): Observable<Array<Itodo>> {
    return this._http.get<Array<Itodo>>(this.TODOS_URL)
      .pipe(
        map((res: any) => {
          let todoArr: Array<Itodo> = []
          for (const key in res) {
            todoArr.push({ ...res[key], todoId: key })
          }

          return todoArr
        })
      )
  }

  postTodoItem(todoBody: { todoItem: string }): Observable<any> {
    return this._http.post(this.TODOS_URL, todoBody)
  }

  updateTodo(todo: Itodo): Observable<Itodo> {
    // update url
    let UPDATE_URL = `${this.BASE_URL}/todos/${todo.todoId}.json`
    // patch API
    return this._http.patch<Itodo>(UPDATE_URL, todo)
  }

  removeTodo(id: string): Observable<null>{
    let REMOVE_URL = `${this.BASE_URL}/todos/${id}.json`;
    return this._http.delete<null>(REMOVE_URL);
  }
}


