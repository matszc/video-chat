import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomListRoutingModule } from './room-list-routing.module';
import { ListComponent } from './components/list/list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRoomList from './+state/room-list.reducer';
import { RoomListEffects } from './+state/room-list.effects';
import { RoomListFacade } from './+state/room-list.facade';
import { RoomComponent } from './components/room/room.component';
import { RoomResolver } from './resolvers/room.resolver';

@NgModule({
  declarations: [ListComponent, RoomComponent],
  imports: [
    CommonModule,
    RoomListRoutingModule,
    StoreModule.forFeature(
      fromRoomList.ROOMLIST_FEATURE_KEY,
      fromRoomList.reducer
    ),
    EffectsModule.forFeature([RoomListEffects]),
  ],
  providers: [RoomListFacade, RoomResolver],
})
export class RoomListModule {}
