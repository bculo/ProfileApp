import { createReducer, on } from "@ngrx/store";
import { User } from "./user.model";


import * as UserActions from './user.actions';

export interface UserState {
    entity: User;
    uid: string;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    entity: null,
    uid: null,
    loading: null,
    error: null
};

export const userReducer = createReducer(
    initialState,

    on(UserActions.init,
        (state, action) => ({
            ...state,
            loading: true,
        })
    ),

    on(UserActions.initAuthorized,
        (state, action) => ({
            ...state,
            loading: false,
            uid: action.uid,
            entity: action.user
        })
    ),

    on(UserActions.initUnauthorized,
        (state, action) => ({
            ...state,
            loading: false,
            entity: null,
            uid: null
        })
    ),

    on(UserActions.initError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),

    on(UserActions.init,
        (state, action) => ({
            ...state,
            loading: true,
        })
    ),

    on(UserActions.signInEmail, 
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(UserActions.signInEmailSuccess, 
        (state, action) => ({
            ...state,
            loading: false,
            uid: action.uid,
            entity: action.user
        })
    ),

    on(UserActions.signInEmailError, 
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),

    on(UserActions.signUpEmail, 
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(UserActions.signUpEmailSuccess, 
        (state, action) => ({
            ...state,
            loading: false,
            uid: action.uid
        })
    ),

    on(UserActions.signInEmailError, 
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),

    on(UserActions.signOut, 
        (state, action) => ({
            ...state,
            loading: true,
        })
    ),

    on(UserActions.signOutSuccess, 
        (state, action) => ({
            ...state
        })
    ),

    on(UserActions.signOutError, 
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),
)