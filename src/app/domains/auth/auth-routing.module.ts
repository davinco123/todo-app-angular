import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './pages/auth-page/auth.component';
import { AuthPageGuard } from '../share/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthPageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
