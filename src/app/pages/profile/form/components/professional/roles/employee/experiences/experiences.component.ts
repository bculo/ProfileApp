import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

interface Period {
  from: number;
  to: number;
}

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {

  @Input() public parent: FormGroup;
  @Input() public name: string;

  @Input() public values: ExperienceForm[];

  form: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }

  ngOnInit(): void {
    this.values = this.values ? this.values : [];
    this.init();
  }

  private init() {
    this.form = this.fb.array(this.getFormGroupArray(this.values));

    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values: ExperienceForm[]): FormGroup[] {
    if(!this.values.length){
      return [this.getFromGroup()];
    } else {
      return values.map(item => this.getFromGroup(item));
    }
  }

  private getFromGroup(value?: ExperienceForm): FormGroup {
    const group = this.fb.group({
      companyName: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      period: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    if(value) {
      group.patchValue(value);
    }

    return group;
  }

  addExperience(): void {
    this.form.push(this.getFromGroup());
  }

  deleteExperience(i: number): void {
    this.form.removeAt(i);
  }

}
