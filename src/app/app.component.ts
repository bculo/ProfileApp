import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { select, Store } from '@ngrx/store';

import * as fromRoot from './store/'
import * as fromUser from './store/user/user.selectors'
import * as DictionariesActions from './store/dictionaries/dictionaries.actions';
import * as UserActions from './store/user/user.actions';
import { filter, Observable, take } from 'rxjs';
import { User } from './store/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isAuthorized$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized))
    this.user$ = this.store.pipe(select(fromUser.getUser))

    this.store.dispatch(UserActions.init());

    this.store.pipe(select(fromUser.getUserState)).pipe(
      filter(state => !!state.uid),
      take(1)
    ).subscribe(() => {
      this.store.dispatch(DictionariesActions.read());
    });
  }

  signOut() {
    this.store.dispatch(UserActions.signOut());
  }
}
