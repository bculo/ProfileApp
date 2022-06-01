import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/store/';
import * as fromUser from 'src/app/store/user/';

@Injectable()
export class UserResolver implements Resolve<fromUser.User> {

    constructor(private store: Store<fromRoot.State>) {
    }

    resolve(): Observable<fromUser.User> {
        return this.store.pipe(select(fromUser.getUser), filter(user => !!user), take(1));
    }
}
