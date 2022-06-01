import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { UserEffects } from "src/app/store/user";

import * as fromForm from './form/form.reducer';

export interface ProfileState {
    form: fromForm.FormState;
}

export const reducers: ActionReducerMap<ProfileState> = {
    form: fromForm.formReducer
}

export const effects: any[] = [
    
]

export const getProfileState = createFeatureSelector<ProfileState>('profile');