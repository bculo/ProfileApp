import { createAction, props } from "@ngrx/store";
import { ProfileForm } from "./form.models";

const SET = '[Profile] Form: Set';
const UPDATE = '[Profile] Form: Update';
const CLEAR = '[Profile] Form: Clear';

export const setForm = createAction(
    SET,
    props<{
        form: ProfileForm
    }>()
);

export const updateForm = createAction(
    UPDATE,
    props<{
        changes: Partial<ProfileForm>
    }>()
);

export const clearForm = createAction(
    CLEAR
);