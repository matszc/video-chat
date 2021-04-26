import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ROOMLIST_FEATURE_KEY,
  State,
  RoomListPartialState,
  roomListAdapter,
} from './room-list.reducer';

// Lookup the 'RoomList' feature state managed by NgRx
export const getRoomListState = createFeatureSelector<
  RoomListPartialState,
  State
>(ROOMLIST_FEATURE_KEY);

const { selectAll, selectEntities } = roomListAdapter.getSelectors();

export const getRoomListLoaded = createSelector(
  getRoomListState,
  (state: State) => state.loaded
);

export const getRoomListError = createSelector(
  getRoomListState,
  (state: State) => state.error
);

export const getAllRoomList = createSelector(getRoomListState, (state: State) =>
  selectAll(state)
);

export const getRoomListEntities = createSelector(
  getRoomListState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRoomListState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getRoomListEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
