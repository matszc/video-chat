import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { LoginEffects } from './login.effects';
import * as LoginActions from './login.actions';

describe('LoginEffects', () => {
  let actions: Observable<any>;
  let effects: LoginEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LoginEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(LoginEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LoginActions.init() });

      const expected = hot('-a-|', {
        a: LoginActions.loadLoginSuccess({ login: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
