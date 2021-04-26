import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { RoomListEntity } from './room-list.models';
import { RoomListEffects } from './room-list.effects';
import { RoomListFacade } from './room-list.facade';

import * as RoomListSelectors from './room-list.selectors';
import * as RoomListActions from './room-list.actions';
import {
  ROOMLIST_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './room-list.reducer';

interface TestSchema {
  roomList: State;
}

describe('RoomListFacade', () => {
  let facade: RoomListFacade;
  let store: Store<TestSchema>;
  const createRoomListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RoomListEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ROOMLIST_FEATURE_KEY, reducer),
          EffectsModule.forFeature([RoomListEffects]),
        ],
        providers: [RoomListFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(RoomListFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allRoomList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allRoomList$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadRoomListSuccess` to manually update list
     */
    it('allRoomList$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allRoomList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          RoomListActions.loadRoomListSuccess({
            roomList: [
              createRoomListEntity('AAA'),
              createRoomListEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allRoomList$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
