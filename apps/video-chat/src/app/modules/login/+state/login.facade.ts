import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as LoginActions from './login.actions';
import { PostUserModel } from '../../../../../../../libs/api-interfaces/src/lib/user/post-user.model';
import { LoginUserModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user.model';

@Injectable()
export class LoginFacade {

  constructor(private store: Store) {}

  register(data: PostUserModel): void {
    this.store.dispatch(LoginActions.register({data}));
  }

  login(payload: LoginUserModel): void {
    this.store.dispatch(LoginActions.login({payload}));
  }

}
