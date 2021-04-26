import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LayoutContainerFeature from './layout-container.reducer';
import * as LayoutContainerActions from './layout-container.actions';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LayoutContainerFacade } from './layout-container.facade';

@Injectable()
export class LayoutContainerEffects {

  refreshToken$: any = createEffect(() => this.actions$.pipe(
    ofType(LayoutContainerActions.tryRefreshToken),
    fetch({
      run: () => {
       return this.authService.tryRefreshToken().pipe(
        map(r => LayoutContainerActions.saveToken({payload: r}))
       )
      },
      onError: () => {
      }
    })
 ))

  logout$: any = createEffect(() => this.actions$.pipe(
    ofType(LayoutContainerActions.logout),
    fetch({
      run: () => {
        return this.authService.logout().pipe(
          map(() => {
            return LayoutContainerActions.logoutSuccess();
          }))
      },
      onError: (a, e) => {
        console.error(e);
        return LayoutContainerActions.logoutError;
      }
    })
  ))

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
