import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LAYOUTCONTAINER_FEATURE_KEY,
  State,
  LayoutContainerPartialState,
  layoutContainerAdapter,
} from './layout-container.reducer';

// Lookup the 'LayoutContainer' feature state managed by NgRx
export const getLayoutContainerState = createFeatureSelector<
  LayoutContainerPartialState,
  State
>(LAYOUTCONTAINER_FEATURE_KEY);

const { selectAll, selectEntities } = layoutContainerAdapter.getSelectors();

export const getLayoutContainerLoaded = createSelector(
  getLayoutContainerState,
  (state: State) => state.loaded
);

export const getLayoutContainerError = createSelector(
  getLayoutContainerState,
  (state: State) => state.error
);

export const getAllLayoutContainer = createSelector(
  getLayoutContainerState,
  (state: State) => selectAll(state)
);

export const getLayoutContainerEntities = createSelector(
  getLayoutContainerState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getLayoutContainerState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getLayoutContainerEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
