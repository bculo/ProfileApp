import { createAction, props } from "@ngrx/store";
import { Dictionaries } from "./dictionaries.models";


const READ = '[Dictionaries] Read: Start';
const READ_SUCCESS = '[Dictionaries] Read: Success';
const READ_ERROR = '[Dictionaries] Read: Error';


export const read = createAction(
    READ
);

export const readSuccess = createAction(
    READ_SUCCESS,
    props<{ dictionaries: Dictionaries }>()
)

export const readError = createAction(
    READ_ERROR,
    props<{ error: string }>()
)