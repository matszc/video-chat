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

export const getAllRoomList = createSelector(getRoomListState, (state: State) =>
  selectAll(state)
);

export const getRoomListEntities = createSelector(
  getRoomListState,
  (state: State) => selectEntities(state)
);

export const getCreatedRoomId = createSelector(
  getRoomListState,
  (state: State) => state.createdRoomId
)

export const getRoom = createSelector(
  getRoomListState,
  (state: State) => state.room
)
