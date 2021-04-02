import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LayoutContainerActions from './layout-container.actions';
import { LayoutContainerEntity } from './layout-container.models';

export const LAYOUTCONTAINER_FEATURE_KEY = 'layoutContainer';

export interface State extends EntityState<LayoutContainerEntity> {
  selectedId?: string | number; // which LayoutContainer record has been selected
  loaded: boolean; // has the LayoutContainer list been loaded
  error?: string | null; // last known error (if any)
}

export interface LayoutContainerPartialState {
  readonly [LAYOUTCONTAINER_FEATURE_KEY]: State;
}

export const layoutContainerAdapter: EntityAdapter<LayoutContainerEntity> = createEntityAdapter<LayoutContainerEntity>();

export const initialState: State = layoutContainerAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const layoutContainerReducer = createReducer(
  initialState,
  on(LayoutContainerActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    LayoutContainerActions.loadLayoutContainerSuccess,
    (state, { layoutContainer }) =>
      layoutContainerAdapter.setAll(layoutContainer, { ...state, loaded: true })
  ),
  on(LayoutContainerActions.loadLayoutContainerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutContainerReducer(state, action);
}
