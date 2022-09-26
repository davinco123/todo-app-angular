import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { TodoListHeaderComponent } from './components/todo-list-header/todo-list-header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoPageComponent } from './pages/todo-lists/todo-page.component';
import { TodoListsRoutingModule } from './todo-lists-routing.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [TodoPageComponent, TodoListComponent, TodoListHeaderComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    TodoListsRoutingModule,
    AngularSvgIconModule.forRoot(),
    ShareModule,
  ],
})
export class TodoListsModule {}
