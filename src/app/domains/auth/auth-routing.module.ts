import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthPageGuard } from '../share/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    canActivate: [AuthPageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
