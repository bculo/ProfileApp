import { createSelector } from "@ngrx/store";
import { getJobsState, JobsState } from "..";
import { listAdapter } from "./list.reducer";


export const getListState = createSelector(
    getJobsState,
    (state: JobsState) => state.list
);

export const {
    selectAll,
    selectEntities,
    selectTotal,
    selectIds
} = listAdapter.getSelectors(getListState);

export const selectEntityById = (props: {id: string}) => 
    createSelector(selectEntities, (entities) => {
        return entities[props.id];
    });

