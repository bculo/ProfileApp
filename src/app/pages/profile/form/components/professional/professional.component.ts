import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { markFormGroupTouched } from 'src/app/shared/utils/form';
import { regexErrors } from 'src/app/shared/utils/regex';
import { Dictionaries } from 'src/app/store/dictionaries';
import { StepperService } from '../stepper/services/stepper.service';
import { EmployeeForm } from './roles/employee/employee.component';
import { RecruiterForm } from './roles/recruiter/recruiter.component';

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: RecruiterForm | EmployeeForm
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value: ProfessionalForm
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<ProfessionalForm>();

  form: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor(private stepper: StepperService, 
    private fb: FormBuilder,
    private cdf: ChangeDetectorRef) { 
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {

    console.log(this.dictionaries.skills.controlItems);

    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validators: [
          Validators.required,
        ]
      }],
      about: [null]
    });

    if(this.value){
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if(!this.form.valid){
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
      }
      else{
        this.changed.emit(this.form.value);
      }

      this.stepper[type].next(this.form.valid);
    });
  }

}
