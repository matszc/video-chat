import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RoomListFeature from './room-list.reducer';
import * as RoomListActions from './room-list.actions';

@Injectable()
export class RoomListEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomListActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return RoomListActions.loadRoomListSuccess({ roomList: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return RoomListActions.loadRoomListFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
