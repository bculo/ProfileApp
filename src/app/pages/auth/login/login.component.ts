import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { markFormGroupTouched } from 'src/app/shared/utils/form';

import * as fromRoot from 'src/app/store'

import * as fromUserModels from 'src/app/store/user/user.model';
import * as UserActions from 'src/app/store/user/user.actions';
import * as userSelections from 'src/app/store/user/user.selectors';

import { Observable } from 'rxjs';

import { regexErrors } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  regexErrors = regexErrors;
  loading$: Observable<boolean>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(userSelections.getLoading));

    this.form = this.fb.group({
      email: [null, {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.maxLength(128),
        ]
      }],
      password: [null, {
        updateOn: 'change', validators: [
            Validators.required
        ]
      }]
    })
  }
  

  public onSubmit(): void {
    if (this.form.valid) {
        const value = this.form.value;
        const credentials: fromUserModels.EmailPasswordCredentials = {
            email: value.email,
            passworrd: value.password
        };
        this.store.dispatch(UserActions.signInEmail({ credentials: credentials }));

    } else {
        markFormGroupTouched(this.form);
    }
  }

}
