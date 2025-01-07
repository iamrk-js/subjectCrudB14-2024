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

  newTodoSub$ : Subject<Itodo> = new Subject<Itodo>()
  constructor(
    private _http : HttpClient
  ) { }

  fetchAllTodos() : Observable<Array<Itodo>>{
    return this._http.get<Array<Itodo>>(this.TODOS_URL)
            .pipe(
              map((res:any) => {
                let todoArr :Array<Itodo> = []
                for (const key in res) {
                    todoArr.push({...res[key], todoId: key})
                }

                return todoArr
              })
            )
  }

  postTodoItem(todoBody : {todoItem : string}):Observable<any>{
    return this._http.post(this.TODOS_URL,todoBody)
  }
}


