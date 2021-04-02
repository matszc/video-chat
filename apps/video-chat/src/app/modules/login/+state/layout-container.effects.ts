import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LayoutContainerFeature from './layout-container.reducer';
import * as LayoutContainerActions from './layout-container.actions';

@Injectable()
export class LayoutContainerEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutContainerActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return LayoutContainerActions.loadLayoutContainerSuccess({
            layoutContainer: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return LayoutContainerActions.loadLayoutContainerFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
