import { ActionReducerMap } from "@ngrx/store";

import * as fromDictionaries from './dictionaries/dictionaries.reducers';
import * as fromUser from './user/user.reducers';

export interface State {
    dictionaries: fromDictionaries.DictionariesState;
    user: fromUser.UserState
}

export const reducers: ActionReducerMap<State> = {
    dictionaries: fromDictionaries.dictionariesReducer,
    user: fromUser.userReducer
}