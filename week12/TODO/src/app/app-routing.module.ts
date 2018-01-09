import {RouterModule, Route} from '@angular/router';
import {Todos} from './todos/todos.component';
import {CreateTodo} from './todos/create/createTodo.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'list',
    component: Todos
  },
  {
    path: 'create',
    component: CreateTodo
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
