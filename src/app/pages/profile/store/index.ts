import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromForm from './form/form.reducer';
import { UserEffects } from './user/user.effects';
import * as fromUser from './user/user.reducer'

export interface ProfileState {
    form: fromForm.FormState;
    user: fromUser.UserState;
}

export const reducers: ActionReducerMap<ProfileState> = {
    form: fromForm.formReducer,
    user: fromUser.formReducer
}

export const effects: any[] = [
    UserEffects
]

export const getProfileState = createFeatureSelector<ProfileState>('profile');