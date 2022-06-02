import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, take, tap } from "rxjs";

import * as UserActions from './user.actions';
import { User } from "./user.models";

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private afs: AngularFirestore){
    }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.read),
        switchMap(action => {
            return this.afs.doc<User>(`users/${action.id}`).valueChanges().pipe(
                take(1),
                tap((data) => console.log(data)),
                map(user => {return UserActions.readSuccess({user: user})}),
                catchError(err => of(UserActions.readError({error: err.message})))
            )
        })
    ))

}