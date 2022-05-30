import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ButtonsModule } from 'src/app/shared/buttons';
import { ControlsModule, FormFieldModule } from 'src/app/shared/controls';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule } from 'src/app/shared/indicators/indicators.module';
import { PopupsModule } from 'src/app/shared/popups/popups.module';


@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonsModule,
    ReactiveFormsModule,
    FormFieldModule,
    ControlsModule,
    IndicatorsModule,
    PopupsModule
  ]
})
export class SharedModule { }
