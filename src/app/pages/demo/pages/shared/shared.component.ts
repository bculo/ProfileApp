import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from 'src/app/models/frontend';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { markFormGroupTouched } from 'src/app/shared/utils/form';
import { regex, regexErrors } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  form: FormGroup;
  isInline: boolean;
  regexErrors = regexErrors;

  items: ControlItem[];

  showSpinner = false;

  constructor(private fb: FormBuilder, private notifiction: NotificationService) {
    this.isInline = true;

    this.items = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3 },
      { label: 'Fourth', value: 4 },
    ]
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(regex.password)
        ]
      }],
      select: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
      checkbox: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
      radio: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
      date: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
      autocomplete: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
      dateRange: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }],
    });
  }

  onPatchValue(){
    this.form.patchValue(
      {
        input: 123,
        password: 'qwerty',
        autocomplete: 1,
        select: 2,
        checkbox: [3],
        radio: 4,
        date: new Date().getTime(),
        dateRange: {
            from: new Date(2019, 5, 10).getTime(),
            to: new Date(2019, 5, 25).getTime()
        }
      });
  }

  onSubmit() {
    if(!this.form.valid){
      markFormGroupTouched(this.form);
    }
    
  }

  onToggleInline(){
    this.isInline = !this.isInline;
  }

  onToggleDisable() {
    if(this.form.enabled){
      this.form.disable();
    }
    else{
      this.form.enable();
    }
  }

  onToggleSpinner(){
    this.showSpinner = !this.showSpinner;
  }

  onError(){
    this.notifiction.error("ERROR!!!");
  }

  onSuccess() {
    this.notifiction.success("SUCCESS!!!");
  }

  onFilesChanged(urls: string | string[]){
    console.log(urls);
  }
  
}
