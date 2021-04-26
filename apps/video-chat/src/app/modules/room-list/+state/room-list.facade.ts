import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as RoomListActions from './room-list.actions';
import * as RoomListFeature from './room-list.reducer';
import * as RoomListSelectors from './room-list.selectors';

@Injectable()
export class RoomListFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(RoomListSelectors.getRoomListLoaded));
  allRoomList$ = this.store.pipe(select(RoomListSelectors.getAllRoomList));
  selectedRoomList$ = this.store.pipe(select(RoomListSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(RoomListActions.init());
  }
}
