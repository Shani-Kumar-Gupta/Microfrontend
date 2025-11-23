import { Component, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('todoListingContainer', { read: ViewContainerRef }) todoListingContainer!: ViewContainerRef;
  @ViewChild('todoCreateContainer', { read: ViewContainerRef }) todoCreateContainer!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.loadTodoListingComponent();
    this.loadTodoCreateComponent();
  }

  async loadTodoListingComponent(): Promise<void> {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './TodoListingComponent'
      });
      const componentRef = this.todoListingContainer.createComponent(module.TodoListingComponent);
    } catch (error) {
      console.error('Error loading todo listing component:', error);
    }
  }

  async loadTodoCreateComponent(): Promise<void> {
    try {
      // Create container for React component
      const reactElement = document.createElement('div');
      reactElement.id = 'react-todo-create-root';
      this.todoCreateContainer.element.nativeElement.appendChild(reactElement);
      
      // Load React and ReactDOM from shared dependencies
      const [React, ReactDOM] = await Promise.all([
        import('react'),
        import('react-dom')
      ]);
      
      // Load React component from remote
      const module = await loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:3001/remoteEntry.js',
        exposedModule: './TodoCreateComponent'
      });
      
      // Get the component (could be default export or named export)
      const TodoCreateComponent = module.default || module.TodoCreateComponent;
      
      if (TodoCreateComponent) {
        ReactDOM.default.render(
          React.default.createElement(TodoCreateComponent),
          reactElement
        );
      }
    } catch (error) {
      console.error('Error loading todo create component:', error);
    }
  }
}
