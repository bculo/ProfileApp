import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DictionariesState } from "./dictionaries.reducers";

export const getDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.entities
);

export const getLoading = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.loading
);

export const getIsReady = createSelector(
    getDictionariesState,
    (state) => state.entities && !state.loading
)

export const getError = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.error
);

export const getSkills = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.entities.skills
);

export const getRoles = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.entities.roles
);

export const getQualifications = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.entities.qualifications
);

export const getSpecializations = createSelector(
    getDictionariesState,
    (state: DictionariesState) => state.entities.specializations
);