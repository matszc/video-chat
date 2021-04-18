import { createAction, props } from '@ngrx/store';
import { LoginEntity } from './login.models';
import { PostUserModel } from '../../../../../../../libs/api-interfaces/src/lib/user/post-user.model';
import { LoginUserModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user.model';

export const register = createAction(
  '[Login] Register',
  props<{ data: PostUserModel }>()
);

export const registerSuccess = createAction('[Login] Register Success');

export const registerError = createAction('[Login] Register Error',
  props<{error: any}>()
)

export const  login = createAction('[Login] Login',
  props<{ payload: LoginUserModel }>()
)

export const  loginSuccess = createAction('[Login] Login Success'
)

export const  loginError = createAction('[Login] Login Error',
  props<{error: any}>()
)
