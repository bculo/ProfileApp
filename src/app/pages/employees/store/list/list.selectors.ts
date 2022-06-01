import { createSelector } from '@ngrx/store';

import { ListState } from './list.reducer';
import { getEmployeeState, EmployeeState } from '../index';

export const getListState = createSelector(
    getEmployeeState,
    (state: EmployeeState) => state.list
);

export const getItems = createSelector(
    getListState,
    (state: ListState) => state.items
);

export const getLoading = createSelector(
    getListState,
    (state: ListState) => state.loading
);
