import { createReducer, on } from '@ngrx/store';
import * as DictionariesActions from './dictionaries.actions';
import { Dictionaries } from './dictionaries.models';

export interface DictionariesState {
    entities: Dictionaries;
    loading: boolean;
    error: string;
}

const initialState: DictionariesState = {
    entities: null,
    loading: null,
    error: null
}

export const dictionariesReducer = createReducer(
    initialState,

    on(DictionariesActions.read, 
        state => ({ 
            ...state, 
            loading: true,
            error: null
        })
    ),

    on(DictionariesActions.readSuccess, 
        (state, action) => ({ 
            ...state,
            entities: action.dictionaries, 
            loading: false,
            error: null
        })
    ),

    on(DictionariesActions.readError, 
        (state, action) => ({ 
            ...state,
            loading: false,
            error: action.error
        })
    ),

);