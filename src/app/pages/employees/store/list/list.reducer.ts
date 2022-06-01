import { createReducer, on } from "@ngrx/store"

import * as ListActions from './list.actions';
import { User } from "./list.models";

export interface ListState {
    loading: boolean;
    error: string,
    items: User[]
}

const initialState: ListState = {
    loading: null,
    error: null,
    items: null,
}

export const listReducer = createReducer(
    initialState,

    on(ListActions.read,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(ListActions.readSucces,
        (state, action) => ({
            ...state,
            loading: false,
            items: [...action.items]
        })
    ),

    on(ListActions.readError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),
)