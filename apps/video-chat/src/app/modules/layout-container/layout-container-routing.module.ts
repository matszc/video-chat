import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

const routes: Routes = [
  {path: '', component: LayoutContainerComponent, children: [
      {path: 'auth', canActivate: [UnAuthGuard], loadChildren: () => import('../login/login.module').then(m => m.LoginModule)},
      {path: 'room-list', canActivate:[AuthGuard], loadChildren: () => import('../room-list/room-list.module').then(m => m.RoomListModule)},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutContainerRoutingModule { }
