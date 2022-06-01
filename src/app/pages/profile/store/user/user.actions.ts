import { createAction, props } from "@ngrx/store";
import { User } from "./user.models";

const READ = '[Profile] Read: start';
const READ_SUCCESS = '[Profile] Read: success';
const READ_ERROR = '[Profile] Read: error';
const CLEAR = '[Profile] Read: clear'

export const read = createAction(
    READ,
    props<{
        id: string
    }>()
);

export const readSuccess = createAction(
    READ_SUCCESS,
    props<{
        user: User
    }>()
);

export const readError = createAction(
    READ_ERROR,
    props<{
        error: string
    }>()
);

export const clear = createAction(
    CLEAR,
);