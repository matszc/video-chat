import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { LayoutContainerEffects } from './layout-container.effects';
import * as LayoutContainerActions from './layout-container.actions';

describe('LayoutContainerEffects', () => {
  let actions: Observable<any>;
  let effects: LayoutContainerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LayoutContainerEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(LayoutContainerEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LayoutContainerActions.init() });

      const expected = hot('-a-|', {
        a: LayoutContainerActions.loadLayoutContainerSuccess({
          layoutContainer: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
