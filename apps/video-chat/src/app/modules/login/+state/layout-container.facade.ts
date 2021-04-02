import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as LayoutContainerActions from './layout-container.actions';
import * as LayoutContainerFeature from './layout-container.reducer';
import * as LayoutContainerSelectors from './layout-container.selectors';

@Injectable()
export class LayoutContainerFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(LayoutContainerSelectors.getLayoutContainerLoaded)
  );
  allLayoutContainer$ = this.store.pipe(
    select(LayoutContainerSelectors.getAllLayoutContainer)
  );
  selectedLayoutContainer$ = this.store.pipe(
    select(LayoutContainerSelectors.getSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(LayoutContainerActions.init());
  }
}
