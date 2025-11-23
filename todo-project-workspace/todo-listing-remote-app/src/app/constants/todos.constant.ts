import { Todo } from '../models/todo.model';

export const INITIAL_TODOS: Todo[] = [
  {
    id: 1,
    name: 'Complete Angular Module Federation setup',
    completed: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Implement Todo Listing Component',
    completed: false,
    createdAt: new Date('2024-01-16')
  },
  {
    id: 3,
    name: 'Set up communication between microfrontends',
    completed: false,
    createdAt: new Date('2024-01-17')
  },
  {
    id: 4,
    name: 'Test the complete application',
    completed: false,
    createdAt: new Date('2024-01-18')
  }
];

