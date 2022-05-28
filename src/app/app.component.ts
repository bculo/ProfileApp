import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

import * as fromRoot from './store/'
import * as DictionariesActions from './store/dictionaries/dictionaries.actions';
import * as UserActions from './store/user/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    //this.store.dispatch(DictionariesActions.read());
    this.store.dispatch(UserActions.signInEmail({ credentials: {email: "culix@gmail.com", passsword: "123456"}}));
  }

}
