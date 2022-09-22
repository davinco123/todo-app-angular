import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShareModule } from './domains/share/share.module';
import { AppRoutingModule } from './app-routing.module';

import * as fromApp from './store/app.reducer';
import { AuthInterceptorService } from './domains/auth/auth-interceptor.service';
import { AuthEffects } from './domains/auth/store/auth.effects';
import { TodoListEffects } from './domains/todo-lists/store/todo-lists.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, TodoListEffects]),
    HttpClientModule,
    ShareModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
