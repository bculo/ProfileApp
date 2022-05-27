import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date.component';

import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    MatDatepickerModule,
    CommonModule
  ],
  exports: [
    DateComponent
  ],
})
export class DateModule { }
