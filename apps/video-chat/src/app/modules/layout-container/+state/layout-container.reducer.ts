import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LayoutContainerActions from './layout-container.actions';
import { LayoutContainerEntity } from './layout-container.models';

export const LAYOUTCONTAINER_FEATURE_KEY = 'layoutContainer';

export interface State extends EntityState<LayoutContainerEntity> {
  token: string,
  refreshToken: string,
  loaded: boolean
}

export interface LayoutContainerPartialState {
  readonly [LAYOUTCONTAINER_FEATURE_KEY]: State;
}

export const layoutContainerAdapter: EntityAdapter<LayoutContainerEntity> = createEntityAdapter<LayoutContainerEntity>();

export const initialState: State = layoutContainerAdapter.getInitialState({
  token: undefined,
  refreshToken: undefined,
  loaded: undefined,
});

const layoutContainerReducer = createReducer(
  initialState,
  on(LayoutContainerActions.saveToken,
    (state, {payload}) => ({...state, loaded: payload.token != null, token: payload.token, refreshToken: payload.refresh})),
  on(LayoutContainerActions.logoutSuccess,
    (state) => ({...state, loaded: false, token: undefined, refreshToken: undefined})),
  on(LayoutContainerActions.saveTokenError,(state) => ({...state, loaded: false}))
);

export function reducer(state: State | undefined, action: Action) {
  return layoutContainerReducer(state, action);
}
