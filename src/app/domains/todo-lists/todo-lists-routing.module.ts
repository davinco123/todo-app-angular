import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoPageComponent } from './pages/todo-lists/todo-page.component';
import { AuthGuard } from '../share/authenticate.guard';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListsRoutingModule {}
