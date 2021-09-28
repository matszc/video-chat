import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RoomListFeature from './room-list.reducer';
import * as RoomListActions from './room-list.actions';
import { RoomService } from '../services/room.service';
import { map } from 'rxjs/operators';

@Injectable()
export class RoomListEffects {
  createRoom$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomListActions.createRoom),
      fetch({
        run: (action) => {
          return this.roomService.createRoom().pipe(
            map(r => {
              return RoomListActions.createRoomSuccess({room: r})
            })
          )
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RoomListActions.createRoomError({ error });
        },
      })
    )
  );

  getRoom$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomListActions.getRoom),
      fetch({
        run: (action) => {
          return this.roomService.getRoom(action.id).pipe(
            map(r => {
              return RoomListActions.getRoomSuccess({room: r})
            })
          )
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RoomListActions.getRoomError({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private roomService: RoomService
  ) {}
}
