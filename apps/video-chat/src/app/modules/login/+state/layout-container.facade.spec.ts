import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { LayoutContainerEntity } from './layout-container.models';
import { LayoutContainerEffects } from './layout-container.effects';
import { LayoutContainerFacade } from './layout-container.facade';

import * as LayoutContainerSelectors from './layout-container.selectors';
import * as LayoutContainerActions from './layout-container.actions';
import {
  LAYOUTCONTAINER_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './layout-container.reducer';

interface TestSchema {
  layoutContainer: State;
}

describe('LayoutContainerFacade', () => {
  let facade: LayoutContainerFacade;
  let store: Store<TestSchema>;
  const createLayoutContainerEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LayoutContainerEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LAYOUTCONTAINER_FEATURE_KEY, reducer),
          EffectsModule.forFeature([LayoutContainerEffects]),
        ],
        providers: [LayoutContainerFacade],
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
      facade = TestBed.inject(LayoutContainerFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allLayoutContainer$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allLayoutContainer$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadLayoutContainerSuccess` to manually update list
     */
    it('allLayoutContainer$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allLayoutContainer$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          LayoutContainerActions.loadLayoutContainerSuccess({
            layoutContainer: [
              createLayoutContainerEntity('AAA'),
              createLayoutContainerEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allLayoutContainer$);
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
