import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoPageComponent } from './pages/todo-lists/todo-page.component';
import { TodoListGuard } from '../share/todo-list.guard';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
    canActivate: [TodoListGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListsRoutingModule {}
