import { createAction, props } from '@ngrx/store';
import { LayoutContainerEntity } from './layout-container.models';

export const init = createAction('[LayoutContainer Page] Init');

export const loadLayoutContainerSuccess = createAction(
  '[LayoutContainer/API] Load LayoutContainer Success',
  props<{ layoutContainer: LayoutContainerEntity[] }>()
);

export const loadLayoutContainerFailure = createAction(
  '[LayoutContainer/API] Load LayoutContainer Failure',
  props<{ error: any }>()
);
