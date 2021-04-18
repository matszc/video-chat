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

export const getAllLayoutContainer = createSelector(
  getLayoutContainerState,
  (state: State) => selectAll(state)
);

export const getLayoutContainerEntities = createSelector(
  getLayoutContainerState,
  (state: State) => selectEntities(state)
);
