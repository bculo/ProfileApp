import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { regex, regexErrors } from 'src/app/shared/utils/regex';
import { CustomValidators } from 'src/app/shared/utils/validators';

import * as fromRoot from 'src/app/store/index';
import * as fromUser from 'src/app/store/user/user.selectors';
import * as fromUserModels from 'src/app/store/user/user.model';
import * as UserActions from 'src/app/store/user/user.actions';

import { markFormGroupTouched } from 'src/app/shared/utils/form';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  regexErrors = regexErrors;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group({
      email: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          //Validators.pattern(regex.password)
        ]
      }],
      passwordRepeat: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          //Validators.pattern(regex.password)
        ]
      }],
    })

    this.form.addValidators(CustomValidators.mustMatch("password", "passwordRepeat"));
  }
 
  onSubmit(): void {
    if (this.form.valid) {
        const value = this.form.value;
        const credentials: fromUserModels.EmailPasswordCredentials = {
            email: value.email,
            passworrd: value.password
        };
        this.store.dispatch(UserActions.signUpEmail({credentials: credentials}));
    } else {
        markFormGroupTouched(this.form);
    }
  }

}
