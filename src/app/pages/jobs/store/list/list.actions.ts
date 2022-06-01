import { createAction, props } from "@ngrx/store";
import { Job, JobCreateReuqest } from "./list.models";

const READ = '[Jobs] Read: Start';
const READ_SUCCESS = '[Jobs] Read: Succes';
const READ_ERROR = '[Jobs] Read: Error';

const CREATE = '[Jobs] Create: Start';
const CREATE_SUCCESS = '[Jobs] Create: Succes';
const CREATE_ERROR = '[Jobs] Create: Error';

const UPDATE = '[Jobs] Update: Start';
const UPDATE_SUCCESS = '[Jobs] Update: Succes';
const UPDATE_ERROR = '[Jobs] Update: Error';

const DELETE = '[Jobs] Delete: Start';
const DELETE_SUCCESS = '[Jobs] Delete: Succes';
const DELETE_ERROR = '[Jobs] Delete: Error';

//READ
export const read = createAction(
    READ
);

export const readSuccess = createAction(
    READ_SUCCESS,
    props<{
        items: Job[]
    }>()
);

export const readError = createAction(
    READ_ERROR,
    props<{
        error: string
    }>()
);


//CREATE
export const create = createAction(
    CREATE,
    props<{
        job: JobCreateReuqest
    }>()
);

export const createSuccess = createAction(
    CREATE_SUCCESS,
    props<{
        item: Job
    }>()
);

export const createError = createAction(
    CREATE_ERROR,
    props<{
        error: string
    }>()
);


//UPDATE
export const update = createAction(
    UPDATE,
    props<{
        items: Job
    }>()
);

export const updateSuccess = createAction(
    UPDATE_SUCCESS,
    props<{
        id: string,
        changes: Partial<Job>
    }>()
);

export const updateError = createAction(
    UPDATE_ERROR,
    props<{
        error: string
    }>()
);


//DELETE
export const deleteJob = createAction(
    DELETE,
    props<{
        id: string
    }>()
);

export const deleteSuccess = createAction(
    DELETE_SUCCESS,
    props<{
        id: string
    }>()
);

export const deleteError = createAction(
    DELETE_ERROR,
    props<{
        error: string
    }>()
);