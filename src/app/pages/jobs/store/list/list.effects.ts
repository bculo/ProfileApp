import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, take } from "rxjs";
import { extractDocumentChangeActionData } from "src/app/shared/utils/data";

import * as ListActions from './list.actions';
import { Job } from "./list.models";

@Injectable()
export class ListEffects {

    constructor(private action$: Actions,
        private afs: AngularFirestore){}

    read$ = createEffect(() => this.action$.pipe(
        ofType(ListActions.read),
        switchMap(() => {
            return this.afs.collection('jobs', ref => ref.orderBy('created')).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((jobs: Job[]) => ListActions.readSuccess({items: jobs})),
                catchError(err => of(ListActions.readError({error: err.message})))
            )
        })
    ));

}