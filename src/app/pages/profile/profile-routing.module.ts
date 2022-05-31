import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: 'new',
      loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
      path: 'edit',
      loadChildren: () => import('./form/form.module').then(m => m.FormModule),
  },
  {
      path: ':id',
      loadChildren: () => import('./display/display.module').then(m => m.DisplayModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
