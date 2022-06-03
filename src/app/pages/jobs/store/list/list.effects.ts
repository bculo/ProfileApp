import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { serverTimestamp } from "firebase/firestore";
import { catchError, from, map, of, switchMap, take } from "rxjs";
import { extractDocumentChangeActionData } from "src/app/shared/utils/data";
import { JobsComponent } from "../../jobs.component";

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

    create$ = createEffect(() => this.action$.pipe(
        ofType(ListActions.create),
        map(action => action.job),
        map(job => { return { ...job, created: serverTimestamp() }}),
        switchMap((request) => { 
            return from(this.afs.collection('jobs').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
                map((job: Job) => ListActions.createSuccess({ item: job })),
                catchError(err => of(ListActions.createError({ error: err.message })))
            )
        })
    ));
  
    update$ = createEffect(() => this.action$.pipe(
        ofType(ListActions.update),
        map(action => action.item),
        map(job => { return { ...job, created: serverTimestamp() }}),
        switchMap((job) => { 
            return from(this.afs.collection('jobs').doc(job.id).set(job)).pipe(
                map(() => ListActions.updateSuccess({ id: job.id, changes: job })),
                catchError(err => of(ListActions.updateError({ error: err.message })))
            )
        })
    ));

    delete$ = createEffect(() => this.action$.pipe(
        ofType(ListActions.deleteJob),
        map(action => action.id),
        switchMap((id) => { 
            return from(this.afs.collection('jobs').doc(id).delete()).pipe(
                map(() => ListActions.deleteSuccess({ id: id })),
                catchError(err => of(ListActions.deleteError({ error: err.message })))
            )
        })
    ));
}