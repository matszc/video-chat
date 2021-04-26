import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutContainerFacade } from '../../+state/layout-container.facade';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'vc-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(
    private layoutContainerFacade: LayoutContainerFacade,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.layoutContainerFacade.isSignIn$
      .subscribe(v => {
        this.loadMenu(v);
        if (this.router.url === '/' && v) {
          this.router.navigate(['room-list'])
        } else if(this.router.url === '/' && !v) {
          this.router.navigate(['auth', 'login'])
        }
      })
  }

  private loadMenu(isSignIn: boolean): void {
    if(!isSignIn) {
      this.menuItems = [
        {
          label: 'Logowanie',
          icon: 'pi pi-fw pi-sign-in',
          routerLink: 'auth/login',
          routerLinkActiveOptions: '',
        },
        {
          label: 'Rejestracja',
          routerLink: 'auth/register'
        }
      ]
    } else  {
      this.menuItems = [
        {
          label: 'Uwtwórz pokój',
          routerLink: 'room-list/add',
        },
        {
          label: 'Przeglądaj',
          routerLink: 'room-list/list',
        },
        {
          label: 'Wyloguj',
          command: () => this.layoutContainerFacade.logout()
        }
      ]
    }
  }

}
