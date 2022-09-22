import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ShareModule } from './domains/share/share.module';
import { AppRoutingModule } from './app-routing.module';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './domains/auth/store/auth.effects';
import { CoreModule } from './domains/core/core.module';
import { TodoListEffects } from './domains/todo-lists/store/todo-lists.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, TodoListEffects]),
    ShareModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
