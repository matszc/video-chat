import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomListRoutingModule } from './room-list-routing.module';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RoomListRoutingModule
  ]
})
export class RoomListModule { }
