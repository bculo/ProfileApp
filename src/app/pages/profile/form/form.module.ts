import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components/stepper/stepper.module';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule, ButtonModule, CheckboxesModule, DateRangeModule, FormFieldModule, InputModule, RadiosModule, SelectModule } from 'src/app/shared';
import { FilesUploadModule } from 'src/app/shared/popups/files-upload/files-upload.module';
import { SpinnerModule } from 'src/app/shared/indicators/spinner/spinner.module';
import { UserPhotoModule } from 'src/app/shared/layout/user-photo/user-photo.module';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { ExperiencesComponent } from './components/professional/roles/employee/experiences/experiences.component';


@NgModule({
  declarations: [
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    EmployeeComponent,
    RecruiterComponent,
    ExperiencesComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    StepperModule,
    ReactiveFormsModule,
    InputModule,
    FormFieldModule,
    AutocompleteModule,
    FilesUploadModule,
    SpinnerModule,
    UserPhotoModule,
    SelectModule,
    CheckboxesModule,
    RadiosModule,
    DateRangeModule,
    ButtonModule
  ]
})
export class FormModule { }
