import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as RoomListActions from './room-list.actions';
import { RoomListEntity } from './room-list.models';

export const ROOMLIST_FEATURE_KEY = 'roomList';

export interface State extends EntityState<RoomListEntity> {
  selectedId?: string | number; // which RoomList record has been selected
  loaded: boolean; // has the RoomList list been loaded
  error?: string | null; // last known error (if any)
}

export interface RoomListPartialState {
  readonly [ROOMLIST_FEATURE_KEY]: State;
}

export const roomListAdapter: EntityAdapter<RoomListEntity> = createEntityAdapter<RoomListEntity>();

export const initialState: State = roomListAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const roomListReducer = createReducer(
  initialState,
  on(RoomListActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RoomListActions.loadRoomListSuccess, (state, { roomList }) =>
    roomListAdapter.setAll(roomList, { ...state, loaded: true })
  ),
  on(RoomListActions.loadRoomListFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return roomListReducer(state, action);
}
