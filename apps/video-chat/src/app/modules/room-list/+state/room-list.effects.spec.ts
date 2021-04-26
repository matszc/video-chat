import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RoomListEffects } from './room-list.effects';
import * as RoomListActions from './room-list.actions';

describe('RoomListEffects', () => {
  let actions: Observable<any>;
  let effects: RoomListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RoomListEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RoomListEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RoomListActions.init() });

      const expected = hot('-a-|', {
        a: RoomListActions.loadRoomListSuccess({ roomList: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
