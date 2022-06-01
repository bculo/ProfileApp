import { createReducer, on } from '@ngrx/store';
import { ProfileForm } from '../../form/form.component';

import * as FormActions from './form.actions';

export type FormState = ProfileForm

const initialState: FormState = {
    personal: null,
    professional: null
}

export const formReducer = createReducer(
    initialState,
   
    on(FormActions.setForm,
        (state, action) => ({
            ...state,
            ...action.form
        })
    ),

    on(FormActions.updateForm,
        (state, action) => ({
            ...state,
            ...action.changes
        })
    ),

    on(FormActions.clearForm,
        (state, action) => ({
            ...state,
        })
    ),
);