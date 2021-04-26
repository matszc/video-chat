import { createAction, props } from '@ngrx/store';
import { LayoutContainerEntity } from './layout-container.models';
import { LoginUserResponseModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';

export const saveToken = createAction('[LayoutContainer] Save Token',
  props<{payload: LoginUserResponseModel}>()
)

export const saveTokenError = createAction('[LayoutContainer] Save Token Error')

export const tryRefreshToken = createAction('[LayoutContainer] Try Refresh Token');

export const logout = createAction('[LayoutContainer] Logout');

export const logoutSuccess = createAction('[LayoutContainer] Logout Success');

export const logoutError = createAction('[LayoutContainer] Logout Error');
