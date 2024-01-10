import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<any[]>(this.apiUrl); // Specify the expected response type as 'any[]'
  }

  addTodo(task: string) {
    return this.http.post(this.apiUrl, { task });
  }
  deleteTodo(id: number) {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }
  updateTodoStatus(id: number, completed: boolean) {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put(updateUrl, { completed });
  }
  
}
