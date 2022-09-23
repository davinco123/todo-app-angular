import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth-page/auth.component';
import { AuthHomeComponent } from './components/auth/auth-home.component';
import { AlertComponent } from './components/alert-modal/alert-modal.component';
import { AuthSigninComponent } from './components/auth-signin-modal/auth-signin-modal.component';
import { AuthSignupComponent } from './components/auth-signup-modal/auth-signup-modal.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    AuthHomeComponent,
    AuthComponent,
    AlertComponent,
    AuthSigninComponent,
    AuthSignupComponent,
  ],
  imports: [RouterModule, ReactiveFormsModule, AuthRoutingModule, ShareModule],
})
export class AuthModule {}
