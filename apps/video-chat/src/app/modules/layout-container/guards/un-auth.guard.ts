import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutContainerFacade } from '../+state/layout-container.facade';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanLoad, CanActivate {

  constructor(
    private layoutContainerFacade: LayoutContainerFacade,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.layoutContainerFacade.isSignIn$.pipe(map(i => {
      if(!i) {
        return !i;
      } else {
        return this.router.createUrlTree(['/'])
      }
    }))
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.layoutContainerFacade.isSignIn$.pipe(map(i => !i));
  }

}
