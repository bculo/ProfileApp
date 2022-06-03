import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
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
      },
      {
        path: 'guards',
        loadChildren: () => import("./pages/guards/guards.module").then(i => i.GuardsModule),
        //canLoad: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
