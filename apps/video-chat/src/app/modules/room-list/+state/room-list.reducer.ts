import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as RoomListActions from './room-list.actions';
import { RoomListEntity } from './room-list.models';
import { GetRoomModel } from '../../../../../../../libs/api-interfaces/src/lib/room/get-room.model';

export const ROOMLIST_FEATURE_KEY = 'roomList';

export interface State extends EntityState<RoomListEntity> {
  createdRoomId: string;
  room: GetRoomModel
}

export interface RoomListPartialState {
  readonly [ROOMLIST_FEATURE_KEY]: State;
}

export const roomListAdapter: EntityAdapter<RoomListEntity> = createEntityAdapter<RoomListEntity>();

export const initialState: State = roomListAdapter.getInitialState({
  createdRoomId: null,
  room: null
});

const roomListReducer = createReducer(
  initialState,
  on(RoomListActions.createRoomSuccess, (state, {room}) => ({...state, createdRoomId: room.guid})),
  on(RoomListActions.getRoomSuccess, (state, {room}) => ({...state, room}))

);

export function reducer(state: State | undefined, action: Action) {
  return roomListReducer(state, action);
}
