import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LoginActions from './login.actions';
import { LoginService } from '../services/login.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VcMessageService } from '../../../services/vc-message.service';
import * as LayoutContainerActions from '../../layout-container/+state/layout-container.actions';

@Injectable()
export class LoginEffects {

  register$: any = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.register),
    fetch({
      run:(action) => {
        return this.loginService.register(action.data).pipe(
          tap(() => {
            this.messageService.success('Konto zostało utworzone');
            this.router.navigate(['auth', 'login']);
          }),
          map(() => {
            return LoginActions.registerSuccess()
          })
        )
      },
      onError: (a, e: any): any => {
        console.error(e);
        return LoginActions.registerError({error: e});
      }
    })
  ))

  login$: any = createEffect(() => this.actions$.pipe(
    ofType(LoginActions.login),
    fetch({
      run: a => this.loginService.login(a.payload).pipe(
        tap(() => {
          this.router.navigate(['room-list']);
        }),
        switchMap(res => {
          return [
            LoginActions.loginSuccess(),
            LayoutContainerActions.saveToken({payload: res})
          ]
        })
      ),
      onError: (a, e: any): any => {
        console.error(e);
        return LoginActions.loginError({error: e});
      }
    })
  ))

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private messageService: VcMessageService
  ) {}
}
