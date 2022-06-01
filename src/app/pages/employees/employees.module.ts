import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';
import { UserPhotoModule } from 'src/app/shared/layout/user-photo/user-photo.module';
import { EmployeeComponent } from './components/employee/employee.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    StoreModule.forFeature('employees', reducers),
    EffectsModule.forFeature(effects),
    UserPhotoModule
  ]
})
export class EmployeesModule { }
