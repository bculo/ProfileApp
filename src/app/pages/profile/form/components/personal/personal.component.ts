import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { markFormGroupTouched } from 'src/app/shared/utils/form';
import { regex, regexErrors } from 'src/app/shared/utils/regex';
import { Dictionaries } from 'src/app/store/dictionaries';
import { StepperService } from '../stepper/services/stepper.service';


export interface PersonalForm {
  name: string;
  photoURL: string;
  country: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, OnDestroy {

  @Input() value: PersonalForm
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<PersonalForm>();

  form: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor(private stepper: StepperService, 
    private fb: FormBuilder) { 
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      photoURL: [null],
      name: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.latinAndSpaces)
        ]
      }],
      country: [null, {
        updateOn: 'change', validators: [
          Validators.required,
        ]
      }]
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

  onPhotoChanged(url: string): void {
    if(url){
      this.form.controls['photoURL'].setValue(url);
    }
  }

}
