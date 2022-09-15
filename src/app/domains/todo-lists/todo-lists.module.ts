import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { TodoListsItemComponent } from './components/todo-lists-item/todo-lists-item.component';
import { TodoListsComponent } from './pages/todo-lists/todo-lists.component';
import { TodoListsRoutingModule } from './todo-lists-routing.module';
import { ClickOutSideDirective } from '../share/clickOutside.directive';

@NgModule({
  declarations: [
    TodoListsComponent,
    TodoListsItemComponent,
    HeaderComponent,
    ClickOutSideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TodoListsRoutingModule,
    AngularSvgIconModule.forRoot(),
    HttpClientModule,
  ],
})
export class TodoListModule {}
