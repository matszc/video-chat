import { createAction, props } from '@ngrx/store';
import { RoomListEntity } from './room-list.models';

export const init = createAction('[RoomList Page] Init');

export const loadRoomListSuccess = createAction(
  '[RoomList/API] Load RoomList Success',
  props<{ roomList: RoomListEntity[] }>()
);

export const loadRoomListFailure = createAction(
  '[RoomList/API] Load RoomList Failure',
  props<{ error: any }>()
);
