import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StepperService } from './components/stepper/services/stepper.service';

import * as fromDictionaries from 'src/app/store/dictionaries';
import * as fromRoot from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$: Observable<boolean>;

  private destroy = new Subject<any>();

  constructor(public stepper: StepperService,
    private store: Store<fromRoot.State>) { }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));  
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady));

    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);

    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log("COMPLETED");
    });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log("CANCEL");
    });
    
  }

  onChangedPersonal(from: PersonalForm) {
    console.log(from);
  }

  onChangedProfessioanl(from: ProfessionalForm){
    console.log(from);
  }

}
