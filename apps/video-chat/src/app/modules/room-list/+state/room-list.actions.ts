import { createAction, props } from '@ngrx/store';
import { GetRoomModel } from '../../../../../../../libs/api-interfaces/src/lib/room/get-room.model';

export const createRoom = createAction('[RoomList] Create Room');

export const createRoomSuccess = createAction('[RoomList] Create Room Success',
  props<{ room: GetRoomModel }>()
);

export const createRoomError = createAction(
  '[RoomList] Create Room Error',
  props<{ error: any }>()
);

export const getRoom = createAction('[RoomList] Get Room',
  props<{ id: string }>()
);

export const getRoomSuccess = createAction('[Room List] Get Room Success',
  props<{ room: GetRoomModel }>()
);

export const getRoomError = createAction('[RoomList] Get Room Error',
  props<{ error: any }>()
);

