import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPageGuard } from '../share/auth.guard';
import { AuthSigninComponent } from './components/auth-signin-modal/auth-signin-modal.component';
import { AuthSignupComponent } from './components/auth-signup-modal/auth-signup-modal.component';
import { AuthHomeComponent } from './components/auth/auth-home.component';
import { AuthComponent } from './pages/auth-page/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthPageGuard],
    children: [
      { path: '', component: AuthHomeComponent },
      { path: 'signin', component: AuthSigninComponent },
      { path: 'signup', component: AuthSignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
