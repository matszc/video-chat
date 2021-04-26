import { RoomListEntity } from './room-list.models';
import * as RoomListActions from './room-list.actions';
import { State, initialState, reducer } from './room-list.reducer';

describe('RoomList Reducer', () => {
  const createRoomListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RoomListEntity);

  beforeEach(() => {});

  describe('valid RoomList actions', () => {
    it('loadRoomListSuccess should return set the list of known RoomList', () => {
      const roomList = [
        createRoomListEntity('PRODUCT-AAA'),
        createRoomListEntity('PRODUCT-zzz'),
      ];
      const action = RoomListActions.loadRoomListSuccess({ roomList });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
