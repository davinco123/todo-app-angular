import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/todoLists',
    pathMatch: 'full',
  },
  {
    path: 'todoLists',
    loadChildren: () =>
      import('./domains/todo-lists/todo-lists.module').then(
        (m) => m.TodoListsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./domains/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
