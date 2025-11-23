import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../models/todo.model';
import { INITIAL_TODOS } from '../constants/todos.constant';

@Component({
  selector: 'app-todo-listing',
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.scss']
})
export class TodoListingComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  private todoCreatedListener?: (event: Event) => void;

  ngOnInit(): void {
    // Load initial todos from constant
    this.loadTodos();

    // Listen for todo created events from todo create MFE
    this.todoCreatedListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.todo) {
        const todo: Todo = customEvent.detail.todo;
        this.addTodo(todo);
      }
    };
    window.addEventListener('todoCreated', this.todoCreatedListener);
  }

  ngOnDestroy(): void {
    if (this.todoCreatedListener) {
      window.removeEventListener('todoCreated', this.todoCreatedListener);
    }
  }

  private loadTodos(): void {
    // Load from localStorage if available, otherwise use initial todos
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    } else {
      this.todos = [...INITIAL_TODOS];
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onToggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  onDelete(todoId: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todos = this.todos.filter(t => t.id !== todoId);
      this.saveTodos();
    }
  }

  private addTodo(todo: Todo): void {
    // Ensure unique ID
    const maxId = this.todos.length > 0 
      ? Math.max(...this.todos.map(t => t.id)) 
      : 0;
    todo.id = maxId + 1;
    todo.createdAt = new Date();
    this.todos.push(todo);
    this.saveTodos();
  }
}
