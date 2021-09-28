import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { GetRoomModel } from '../../../../../../../libs/api-interfaces/src/lib/room/get-room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  createRoom(): Observable<GetRoomModel> {
    return this.http.post<GetRoomModel>(`${environment.api}/api/room/create`, {})
  }

  getRoom(id: string): Observable<GetRoomModel> {
    return this.http.get<GetRoomModel>(`${environment.api}/api/room/findOne/${id}`)
  }

  getUserRooms(): Observable<GetRoomModel[]> {
    return this.http.get<GetRoomModel[]>(`${environment.api}/api/room/findUserRooms`)
  }

  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/api/room/${id}`);
  }

}
