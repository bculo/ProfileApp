import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, from, map, of, switchMap, take, tap, } from "rxjs";
import { NotificationService } from "src/app/services/notification/notification.service";
import { environment } from "src/environments/environment";

import * as UserAction from './user.actions';
import { EmailPasswordCredentials, User } from "./user.model";

@Injectable()
export class UserEffects {

    signUpEmail$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.signUpEmail),
        switchMap(action => {
            return from(this.afAuth.createUserWithEmailAndPassword(action.credentials.email, action.credentials.passsword))
                .pipe(
                    tap(() => {
                        this.afAuth.currentUser.then((user) => {
                            user.sendEmailVerification();
                        })
                    }),
                    map((signUpState) => UserAction.signUpEmailSuccess({ uid: signUpState.user.uid })),
                    catchError(error => {
                        this.notification.error(error.message);
                        return of(UserAction.signUpEmailError({ error: error.message }))
                    })
                )
        }),
    ));

    signInEmail$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.signInEmail),
        switchMap(action => {
            return from(this.afAuth.signInWithEmailAndPassword(action.credentials.email, action.credentials.passsword))
                .pipe(
                    switchMap((signInState) => {
                        return this.afs.doc<User>(`users/${signInState.user.uid}`).valueChanges().pipe(
                            take(1),
                            map(user => UserAction.signInEmailSuccess({ uid: user.uid, user: user}))
                        )
                    }),
                    catchError(error => {
                        this.notification.error(error.message);
                        return of(UserAction.signInEmailError({ error: error.message }))
                    })
                )
        }),
    ));

    signOut$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.signOut),
        switchMap(action => {
            return from(this.afAuth.signOut())
                .pipe(
                    map(() => UserAction.signOutSuccess()),
                    catchError(error => {
                        this.notification.error(error.message);
                        return of(UserAction.signOutError({ error: error.message }))
                    })
                )
        }),
    ));


    constructor(
        private action$: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notification: NotificationService
    ){ 
    }
}