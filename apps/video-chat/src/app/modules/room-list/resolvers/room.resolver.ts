import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoomListFacade } from '../+state/room-list.facade';
import { GetRoomModel } from '../../../../../../../libs/api-interfaces/src/lib/room/get-room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomResolver implements Resolve<GetRoomModel> {

  constructor(
    private roomListFacade: RoomListFacade
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetRoomModel> {
    this.roomListFacade.loadRoom(route.paramMap.get('id'))
    return this.roomListFacade.room$;
  }
}
