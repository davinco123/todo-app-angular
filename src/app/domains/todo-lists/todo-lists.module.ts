import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { TodoListsItemComponent } from './components/todo-lists-item/todo-lists-item.component';
import { TodoListsComponent } from './pages/todo-lists/todo-lists.component';
import { TodoListsRoutingModule } from './todo-lists-routing.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [TodoListsComponent, TodoListsItemComponent, HeaderComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    TodoListsRoutingModule,
    AngularSvgIconModule.forRoot(),
    HttpClientModule,
    ShareModule,
  ],
})
export class TodoListsModule {}
