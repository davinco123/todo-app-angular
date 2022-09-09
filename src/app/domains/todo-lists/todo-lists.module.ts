import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { TodoListsItemComponent } from './components/todo-lists-item/todo-lists-item.component';
import { TodoListsComponent } from './pages/todo-lists/todo-lists.component';
import { TodoListsRoutingModule } from './todo-lists-routing.module';

@NgModule({
  declarations: [TodoListsComponent, TodoListsItemComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, TodoListsRoutingModule],
})
export class TodoListModule {}
