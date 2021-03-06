import { createAction, props } from "@ngrx/store";
import { EmailPasswordCredentials, User, UserCreateRequest } from "./user.model";

const INIT = '[User] Init: Start';
const INIT_AUTHORIZED = '[User] Init: Authorized';
const INIT_UNAUTHORIZED = '[User] Init: Unauthorized';
const INIT_ERROR = '[User] Init: Error';

const SIGN_IN_EMAIL = '[User] Sign in: start';
const SIGN_IN_EMAIL_SUCCESS = '[User] Sign in: success';
const SIGN_IN_EMAIL_ERROR = '[User] Sign in: error';

const SIGN_UP_EMAIL = '[User] Sign up: start';
const SIGN_UP_EMAIL_SUCCESS = '[User] Sign up: success';
const SIGN_UP_EMAIL_ERROR = '[User] Sign up: error';

const SIGN_OUT = '[User] Sign out: start';
const SIGN_OUT_SUCCESS = '[User] Sign out: success';
const SIGN_OUT_ERROR = '[User] Sign out: error';

const CREATE = '[User] Create: Start';
const CREATE_SUCCESS = '[User] Create: Success';
const CREATE_ERROR = '[User] Create: Error';

const UPDATE = '[User] Update: Start';
const UPDATE_SUCCESS = '[User] Update: Success';
const UPDATE_ERROR = '[User] Update: Error';

export const init = createAction(
    INIT
);

export const initAuthorized = createAction(
    INIT_AUTHORIZED,
    props<{
        uid: string, user: User
    }>()
);

export const initUnauthorized = createAction(
    INIT_UNAUTHORIZED
);

export const initError = createAction(
    INIT_ERROR,
    props<{
        error: string
    }>()
);

export const signInEmail = createAction(
    SIGN_IN_EMAIL,
    props<{
        credentials: EmailPasswordCredentials
    }>()
);

export const signInEmailSuccess = createAction(
    SIGN_IN_EMAIL_SUCCESS,
    props<{
        uid: string, user: User
    }>()
);

export const signInEmailError = createAction(
    SIGN_IN_EMAIL_ERROR,
    props<{
        error: string
    }>()
);

export const signUpEmail = createAction(
    SIGN_UP_EMAIL,
    props<{
        credentials: EmailPasswordCredentials
    }>()
);

export const signUpEmailSuccess = createAction(
    SIGN_UP_EMAIL_SUCCESS,
    props<{
        uid: string
    }>()
);

export const signUpEmailError = createAction(
    SIGN_UP_EMAIL_ERROR,
    props<{
        error: string
    }>()
);

export const signOut = createAction(
    SIGN_OUT
);

export const signOutSuccess = createAction(
    SIGN_OUT_SUCCESS,
);

export const signOutError = createAction(
    SIGN_OUT_ERROR,
    props<{
        error: string
    }>()
);

export const createUser = createAction(
    CREATE,
    props<{
       user: UserCreateRequest 
    }>()
);

export const createUserSuccess = createAction(
    CREATE_SUCCESS,
    props<{
        user: User 
     }>()
);

export const createUserError = createAction(
    CREATE_ERROR,
    props<{
        error: string 
    }>()
);


export const updateUser = createAction(
    UPDATE,
    props<{
        user: User 
    }>()
);

export const updateUserSuccess = createAction(
    UPDATE_SUCCESS,
    props<{
        user: User 
    }>()
);

export const updateUserError = createAction(
    UPDATE_ERROR,
    props<{
        error: string 
    }>()
);