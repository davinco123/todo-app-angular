import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoListsComponent } from './pages/todo-lists/todo-lists.component';
import { AuthGuard } from '../share/authenticate.guard';

const routes: Routes = [
  {
    path: '',
    component: TodoListsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListsRoutingModule {}
