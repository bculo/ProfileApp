import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from 'src/app/store/dictionaries';

export interface RecruiterForm {
  companyName: string;
  employeesCount: number;
}

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;
  @Input() name: string;

  @Input() value: RecruiterForm;
  @Input() dictionaries: Dictionaries;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }

  ngOnInit(): void {
    console.log("HELLO EmployeeComponent");

    this.form = this.fb.group({
      companyName: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
        ]
      }],
      employeesCount: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
        ]
      }]
    });

    if(this.value){
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);
  }

}