import React, { useState } from 'react';
import './TodoCreateComponent.css';

const TodoCreateComponent: React.FC = () => {
  const [todoName, setTodoName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!todoName.trim()) {
      setError('Todo name is required');
      return;
    }

    setError('');

    // Create todo object
    const todo = {
      id: Date.now(), // Temporary ID, will be replaced by listing component
      name: todoName.trim(),
      completed: false,
      createdAt: new Date(),
    };

    // Dispatch custom event to notify todo listing MFE
    const event = new CustomEvent('todoCreated', {
      detail: { todo },
    });
    window.dispatchEvent(event);

    // Clear form
    setTodoName('');
  };

  return (
    <div className="todo-create-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="todoName">Todo Item Name</label>
          <input
            id="todoName"
            type="text"
            value={todoName}
            onChange={(e) => {
              setTodoName(e.target.value);
              setError('');
            }}
            placeholder="Enter todo item name"
            className={error ? 'error' : ''}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <button type="submit" className="submit-btn">
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default TodoCreateComponent;

