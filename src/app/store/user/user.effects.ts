import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { serverTimestamp } from 'firebase/firestore'
import { catchError, from, map, of, switchMap, take, tap, withLatestFrom, } from "rxjs";
import { NotificationService } from "src/app/services/notification/notification.service";
import { environment } from "src/environments/environment";

import * as UserAction from './user.actions';
import { User } from "./user.model";

@Injectable()
export class UserEffects {

    init$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.init),
        switchMap((action) => {
            return this.afAuth.authState.pipe(take(1))
        }),
        switchMap(state => {
            if(state){
                console.log(`users/${state.uid}`);
                return this.afs.doc<User>(`users/${state.uid}`).valueChanges().pipe(
                    take(1),
                    map(user => UserAction.initAuthorized({ uid: state.uid, user: user})),
                    catchError(error => of(UserAction.initError({ error: error.message })))
                );
            }
            else{
                return of(UserAction.initUnauthorized());
            }
        })
    ))

    signUpEmail$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.signUpEmail),
        switchMap(action => {
            return from(this.afAuth.createUserWithEmailAndPassword(action.credentials.email, action.credentials.passworrd))
                .pipe(
                    tap(() => {
                        this.afAuth.currentUser.then((user) => {
                            user.sendEmailVerification(environment.firebase.actionCodeSettings);
                        });
                        this.router.navigate(['/auth/email-confirm'])
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
            return from(this.afAuth.signInWithEmailAndPassword(action.credentials.email, action.credentials.passworrd))
                .pipe(
                    switchMap((signInState) => {
                        return this.afs.doc<User>(`users/${signInState.user.uid}`).valueChanges().pipe(
                            take(1),
                            tap(() => this.router.navigate(["/"])),
                            map(user => UserAction.signInEmailSuccess({ uid: signInState.user.uid, user: user}))
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
                    tap(() => {
                        this.router.navigate(["/auth/login"]);
                    }),
                    map(() => UserAction.signOutSuccess()),
                    catchError(error => {
                        this.notification.error(error.message);
                        return of(UserAction.signOutError({ error: error.message }))
                    })
                )
        }),
    ));

    createUser$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.createUser),
        map(action => action.user),
        withLatestFrom(this.afAuth.authState.pipe(take(1))),
        map(([user, state]) => ({
            ...user,
            uid: state.uid,
            email: state.email,
            created: serverTimestamp()
        })),
        switchMap(user => {
            return from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
                tap(() => this.router.navigate(['/profile', user.uid])),
                map(() => { return UserAction.createUserSuccess({ user: user }) }),
                catchError(error => { return of(UserAction.createUserError({ error: error.message }))})
            )
        })
    ))

    updateUser$ = createEffect(() => this.action$.pipe(
        ofType(UserAction.updateUser),
        map(action => action.user),
        switchMap(user => {
            return from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
                tap(() => this.router.navigate(['/profile', user.uid])),
                map(() => { return UserAction.updateUserSuccess({ user: user }) }),
                catchError(error => { return of(UserAction.updateUserError({ error: error.message }))})
            )
        })
    ))


    constructor(
        private action$: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notification: NotificationService
    ){ 
    }
}