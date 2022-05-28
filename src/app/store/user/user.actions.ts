import { createAction, props } from "@ngrx/store";
import { EmailPasswordCredentials, User } from "./user.model";

const SIGN_IN_EMAIL = '[User] Sign in: start';
const SIGN_IN_EMAIL_SUCCESS = '[User] Sign in: success';
const SIGN_IN_EMAIL_ERROR = '[User] Sign in: error';

const SIGN_UP_EMAIL = '[User] Sign up: start';
const SIGN_UP_EMAIL_SUCCESS = '[User] Sign up: success';
const SIGN_UP_EMAIL_ERROR = '[User] Sign up: error';

const SIGN_OUT = '[User] Sign out: start';
const SIGN_OUT_SUCCESS = '[User] Sign out: success';
const SIGN_OUT_ERROR = '[User] Sign out: error';

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
    SIGN_OUT,
    props<{
        credentials: EmailPasswordCredentials
    }>()
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