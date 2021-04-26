import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as LayoutContainerActions from './layout-container.actions';
import { interval, Observable, Subscription } from 'rxjs';
import { TokenPayloadModel } from '../../../../../../../libs/api-interfaces/src/lib/user/token-payload.model';
import * as LayoutContainerSelectors from './layout-container.selectors';
import { filter, first, map, skip, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable()
export class LayoutContainerFacade {

  private readonly refreshTimer: number = 5 * 60 * 1000;

  private interval: Subscription;

  userData$: Observable<TokenPayloadModel> = this.store.pipe(
    select(LayoutContainerSelectors.getToken),
    filter(r => !!r),
    map(token => {
      return JSON.parse(this.jwtHelper.decodeToken(token));
    })
  )

  isSignIn$: Observable<boolean> = this.store.pipe(
    select(LayoutContainerSelectors.getLayoutContainerLoaded),
    tap(v => console.log(v)),
    filter(v => v !== undefined)
  );

  constructor(
    private store: Store,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) {}

  logout(): void {
    this.store.dispatch(LayoutContainerActions.logout());
    this.isSignIn$.pipe(
      skip(1),
      first(),
      filter(v => !v)
    )
      .subscribe(() => {
        this.router.navigate(['auth', 'login']);
      })
  }

  getTokens(): void {
    this.store.dispatch(LayoutContainerActions.tryRefreshToken());
  }

  setSilentRenew(): void {
   this.interval = interval(this.refreshTimer).subscribe(() => {
      this.getTokens();
    })
  }

  stopSilentRenew(): void {
    this.interval.unsubscribe();
    this.interval = null;
  }

}
