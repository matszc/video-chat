import { createAction, props } from '@ngrx/store';
import { LayoutContainerEntity } from './layout-container.models';
import { LoginUserResponseModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';

export const saveToken = createAction('[LayoutContainer] Save Token',
  props<{payload: LoginUserResponseModel}>()
)
