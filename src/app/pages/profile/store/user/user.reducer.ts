import { createReducer, on } from "@ngrx/store";
import { User } from "./user.models";

import * as UserActions from './user.actions';

export interface UserState {
    entity: User,
    loading: boolean,
    error: string
}

const intialState: UserState = {
    entity: null,
    loading: null,
    error: null
}

export const formReducer = createReducer(
    intialState,
    
    on(UserActions.read,
        (state, action) => ({
            ...state,
            loading: true,
        })
    ),

    on(UserActions.readSuccess,
        (state, action) => ({
            ...state,
            entity: action.user,
            loading: false
        })
    ),

    on(UserActions.readError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),

    on(UserActions.clear,
        (state, action) => ({
            ...state,
        })
    ),
)