import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, zip } from 'rxjs';

import * as DictionariesActions from './dictionaries.actions';
import { ControlItem, Dictionaries, Dictionary, Item } from './dictionaries.models';

import * as countries from 'src/assets/countries.json';

const documentToItem = (x: DocumentChangeAction<any>): Item => {
    const data = x.payload.doc.data();
    return {
        id: x.payload.doc.id,
        name: data.name
    };
}

const itemToControlItem = (x: Item) : ControlItem => {
    return {
        value: x.id,
        label: x.name,
        icon: x.icon
    };
}

const addDictionary = (items: Item[]): Dictionary => {
    return {
        items,
        controlItems: [...items].map(x => itemToControlItem(x))
    };
}

@Injectable()
export class DictionariesEffects {

    constructor(
        private actions$: Actions,
        private afs: AngularFirestore
    ) {}

    read$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DictionariesActions.read),
            switchMap(() => {
                return zip(
                    this.afs.collection('roles').snapshotChanges().pipe(
                        take(1),
                        map(items => items.map(x => documentToItem(x)))
                    ),
                    this.afs.collection('specialization').snapshotChanges().pipe(
                        take(1),
                        map(items => items.map(x => documentToItem(x)))
                    ),
                    this.afs.collection('qualifications').snapshotChanges().pipe(
                        take(1),
                        map(items => items.map(x => documentToItem(x)))
                    ),
                    this.afs.collection('skills').snapshotChanges().pipe(
                        take(1),
                        map(items => items.map(x => documentToItem(x)))
                    ),
                    of((countries as any).default.map(c => ({
                        id: c.code.toUpperCase(),
                        name: c.name,
                        icon: {
                            src: null,
                            cssClass: 'fflag fflag-' + c.code.toUpperCase()
                        }
                    })))
                ).pipe(
                    map(([roles, specializations, qualification, skills, countries]) => {
                        const dictionaries: Dictionaries = {
                            qualifications: addDictionary(qualification),
                            roles: addDictionary(roles),
                            skills: addDictionary(skills),
                            specializations: addDictionary(specializations),
                            conutries: countries,
                        };
                        return DictionariesActions.readSuccess({dictionaries});
                    }),
                    catchError(error => {
                        return of(DictionariesActions.readError({error: error.message}))
                    })
                )
            })
        )
    );

}