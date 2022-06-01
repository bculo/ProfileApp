import { createReducer, on } from "@ngrx/store";
import { Job } from "./list.models";

import * as ListActions from './list.actions';
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export const listAdapter = createEntityAdapter<Job>();

export interface ListState extends EntityState<Job> {
    loading: boolean;
    error: string;
}

export const initialState: ListState = listAdapter.getInitialState({
    loading: null,
    error: null
});

export const reducer = createReducer(
    initialState,


    //READ
    on(ListActions.read,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(ListActions.readSuccess,
        (state, action) => listAdapter.setAll(action.items, {...state, loading: false})
    ),

    on(ListActions.readError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),


    //CREATE
    on(ListActions.create,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(ListActions.createSuccess,
        (state, action) => listAdapter.addOne(action.item, {...state, loading: false})
    ),

    on(ListActions.createError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),


    //UPDATE
    on(ListActions.update,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(ListActions.updateSuccess,
        (state, action) => listAdapter.updateOne(
        {
            id: action.id, changes: action.changes
        }, 
        {
            ...state, 
            loading: false,
        })
    ),

    on(ListActions.updateError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),

    //UPDATE
    on(ListActions.deleteJob,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(ListActions.deleteSuccess,
        (state, action) => listAdapter.removeOne(action.id, {...state, loading: false})
    ),

    on(ListActions.deleteError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })
    ),
)