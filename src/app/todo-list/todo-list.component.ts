import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: any[] = []; // Define 'todos' as an array of any type
  newTask = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe(
      (data: any[]) => {
        this.todos = data; // Assign the response data to 'this.todos'
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        this.fetchTodos(); // Refresh the list after deletion
        alert("Task deleted successfully");
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }
  markAsCompleted(id: number, completed: boolean) {
    this.todoService.updateTodoStatus(id, completed).subscribe(
      () => {
        this.fetchTodos();
        if (completed) {
          alert('Task marked as completed successfully');
        } else {
          alert('Tick removed successfully');
        }
      },
      (error) => {
        console.error('Error updating todo status:', error);
      }
    );
  }
  
  addTodo() {
    if (this.newTask.trim() !== '') {
      this.todoService.addTodo(this.newTask).subscribe(() => {
        this.fetchTodos();
        this.newTask = '';
      });
    }
  }
}
