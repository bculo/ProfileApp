import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'styles',
        loadChildren: () => import("./pages/styles/styles.module").then(i => i.StylesModule)
      },
      {
        path: 'shared',
        loadChildren: () => import("./pages/shared/shared.module").then(i => i.SharedModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
