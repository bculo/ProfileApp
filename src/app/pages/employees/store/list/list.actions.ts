import { createAction, props } from "@ngrx/store";
import { User } from "./list.models";

const READ = "[Employees] Read: Start";
const READ_SUCCESS = "[Employees] Read: Success";
const READ_ERROR = "[Employees] Read: Error";

export const read = createAction(
    READ
);

export const readSucces = createAction(
    READ_SUCCESS,
    props<{
        items: User[]
    }>()
);

export const readError = createAction(
    READ_ERROR,
    props<{
        error: string
    }>()
);