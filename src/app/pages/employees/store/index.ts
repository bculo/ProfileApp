
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import * as fromList from './list'
import { ListEffects } from './list'

export interface EmployeeState {
    list: fromList.ListState
}

export const reducers: ActionReducerMap<EmployeeState> = {
    list: fromList.listReducer
}

export const effects: any[] = [
    ListEffects
]

export const getEmployeeState = createFeatureSelector<EmployeeState>('employees');