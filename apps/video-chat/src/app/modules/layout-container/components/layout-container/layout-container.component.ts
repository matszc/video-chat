import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'vc-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {

  menuItems: MenuItem[]

  constructor() {
}


  ngOnInit(): void {
    this.loadMenu();
  }

  private loadMenu(): void {
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
  }

}
