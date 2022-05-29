import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
    getUserState,
    (state: UserState) => state.entity
);

export const getLoading = createSelector(
    getUserState,
    (state: UserState) => state.loading
);

export const getIsAuthorized = createSelector(
    getUserState,
    (state: UserState) => state.uid != null
);