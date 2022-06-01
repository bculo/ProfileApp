import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, take, pipe, map } from "rxjs";
import { extractDocumentChangeActionData } from "src/app/shared/utils/data";

import * as ListActions from './list.actions';
import { User } from "./list.models";

@Injectable()
export class ListEffects {

    constructor(private action$: Actions, private afs: AngularFirestore) {}

    read$ = createEffect(() => this.action$.pipe(
        ofType(ListActions.read),
        switchMap(() => {
            return this.afs.collection<User>('users', ref => ref.where('roleId', '==', 'employee')).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x, false))),
                map((items: User[]) => ListActions.readSucces({items: items})),
                catchError(err => of(ListActions.readError({error: err.mesage})))
            )
        })
    ));
}