import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { markFormGroupTouched } from 'src/app/shared/utils/form';
import { regexErrors, regex } from 'src/app/shared/utils/regex';

import * as fromRoot from 'src/app/store'
import * as ListActions from '../../store/list/list.actions'
import { Job } from '../../store/list';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  form: FormGroup;
  regexErrors = regexErrors;

  constructor(private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: Job }) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128),
          //Validators.pattern(regex.safe)
        ]
      }],
      salary: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.pattern(regex.numbers)
        ]
      }]
    });

    if(this.data.value){
      this.form.patchValue(this.data.value);
    }
  }

  onSubmit(){
    if(this.form.valid){
      
      if(this.data.value){
        const updateJob = { ...this.data.value, ...this.form.value };
        this.store.dispatch(ListActions.update({item: updateJob}));
      }
      else {
        const newJob: Job = this.form.value;
        this.store.dispatch(ListActions.create({ job: newJob }));
      }

      this.dialogRef.close();
    }
    else{
      markFormGroupTouched(this.form);
    }
  }

}
