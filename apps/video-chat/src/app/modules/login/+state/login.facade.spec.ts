import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { LoginEntity } from './login.models';
import { LoginEffects } from './login.effects';
import { LoginFacade } from './login.facade';

import * as LoginSelectors from './login.selectors';
import * as LoginActions from './login.actions';
import {
  LOGIN_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './login.reducer';

interface TestSchema {
  login: State;
}

describe('LoginFacade', () => {
  let facade: LoginFacade;
  let store: Store<TestSchema>;
  const createLoginEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LoginEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LOGIN_FEATURE_KEY, reducer),
          EffectsModule.forFeature([LoginEffects]),
        ],
        providers: [LoginFacade],
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
      facade = TestBed.inject(LoginFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allLogin$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allLogin$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadLoginSuccess` to manually update list
     */
    it('allLogin$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allLogin$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          LoginActions.loadLoginSuccess({
            login: [createLoginEntity('AAA'), createLoginEntity('BBB')],
          })
        );

        list = await readFirst(facade.allLogin$);
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
