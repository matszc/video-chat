import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as RoomListActions from './room-list.actions';
import * as RoomListFeature from './room-list.reducer';
import * as RoomListSelectors from './room-list.selectors';
import { Observable } from 'rxjs';
import { GetRoomModel } from '../../../../../../../libs/api-interfaces/src/lib/room/get-room.model';

@Injectable()
export class RoomListFacade {

  createdRoomId$: Observable<string> = this.store.pipe(select(RoomListSelectors.getCreatedRoomId));
  room$: Observable<GetRoomModel> = this.store.pipe(select(RoomListSelectors.getRoom));

  constructor(private store: Store) {}

  createRoom(): void {
    this.store.dispatch(RoomListActions.createRoom());
  }

  loadRoom(id: string): void {
    this.store.dispatch(RoomListActions.getRoom({id}))
  }


}
