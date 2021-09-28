import { GetRoomModel } from '../../../../../../libs/api-interfaces/src/lib/room/get-room.model';

export class GetRoomDto implements GetRoomModel {
  guid: string;
  createdBy: string;
}
