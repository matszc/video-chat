import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LayoutContainerFeature from './layout-container.reducer';
import * as LayoutContainerActions from './layout-container.actions';

@Injectable()
export class LayoutContainerEffects {

  constructor(private actions$: Actions) {}
}
