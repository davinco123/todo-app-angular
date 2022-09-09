import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoListsComponent } from './pages/todo-lists/todo-lists.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListsRoutingModule {}
