import { RoomListEntity } from './room-list.models';
import { State, roomListAdapter, initialState } from './room-list.reducer';
import * as RoomListSelectors from './room-list.selectors';

describe('RoomList Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRoomListId = (it) => it['id'];
  const createRoomListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RoomListEntity);

  let state;

  beforeEach(() => {
    state = {
      roomList: roomListAdapter.setAll(
        [
          createRoomListEntity('PRODUCT-AAA'),
          createRoomListEntity('PRODUCT-BBB'),
          createRoomListEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('RoomList Selectors', () => {
    it('getAllRoomList() should return the list of RoomList', () => {
      const results = RoomListSelectors.getAllRoomList(state);
      const selId = getRoomListId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RoomListSelectors.getSelected(state);
      const selId = getRoomListId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getRoomListLoaded() should return the current 'loaded' status", () => {
      const result = RoomListSelectors.getRoomListLoaded(state);

      expect(result).toBe(true);
    });

    it("getRoomListError() should return the current 'error' state", () => {
      const result = RoomListSelectors.getRoomListError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
