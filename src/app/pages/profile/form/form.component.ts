import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';
import { StepperService } from './components/stepper/services/stepper.service';

import * as fromDictionaries from 'src/app/store/dictionaries';
import * as fromRoot from 'src/app/store';
import * as fromUser from 'src/app/store/user'
import * as fromForm from '../store/form';

import { select, Store } from '@ngrx/store';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';
import { User } from 'src/app/store/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MapperService } from './services/mapper/mapper.service';

import { Dictionaries } from 'src/app/store/dictionaries';

export interface ProfileForm {
  personal: PersonalForm;
  professional: ProfessionalForm;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$: Observable<boolean>;

  personal$: Observable<PersonalForm>;
  professional$: Observable<ProfessionalForm>;
  private profile$: Observable<ProfileForm>;
  private user: User;

  loading$: Observable<boolean>;

  private isEditing: boolean;
  private destroy = new Subject<any>();

  constructor(public stepper: StepperService,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    private mapper: MapperService) { }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
    this.store.dispatch(fromForm.clearForm());
  }

  get title(): string {
    return this.isEditing ? "Edit profile" : "New profile";
  }

  ngOnInit(): void {

    console.log(this.route.snapshot.data);

    this.user = this.route.snapshot.data['user'];
    this.isEditing = !!this.user;

    this.profile$ = this.store.pipe(select(fromForm.getFormState));
    this.personal$ = this.store.pipe(select(fromForm.getPersonalForm));
    this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm));

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));  
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));

    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    if(this.user){
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(fromForm.setForm({ form: form }));
    }

    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);

    this.stepper.complete$.pipe(
      switchMap(() => zip(this.profile$, this.dictionaries$)),
      takeUntil(this.destroy)
    ).subscribe(([profile, dictionaries]) => {
      this.onComplete(profile, this.user, dictionaries);
    });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.router.navigate(['/profile', this.user.uid]);
    });
  }

  onChangedPersonal(form: PersonalForm) {
    this.store.dispatch(fromForm.updateForm({ changes: { personal: form } }));
  }

  onChangedProfessioanl(form: ProfessionalForm){
    this.store.dispatch(fromForm.updateForm({ changes: { professional: form } }));
  }

  private onComplete(profile: ProfileForm, user: User, dictionaries: Dictionaries) {
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(fromUser.updateUser({ user: request }));
    } else {
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(fromUser.createUser({ user: request }));
    }
  }
}
