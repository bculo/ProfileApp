import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { select, Store } from '@ngrx/store';

import * as fromRoot from './store/'
import * as fromUser from './store/user/user.selectors'
import * as DictionariesActions from './store/dictionaries/dictionaries.actions';
import * as UserActions from './store/user/user.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isAuthorized$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized))

    this.store.dispatch(DictionariesActions.read());
    this.store.dispatch(UserActions.init());
  }

  signOut() {
    this.store.dispatch(UserActions.signOut());
  }

}
