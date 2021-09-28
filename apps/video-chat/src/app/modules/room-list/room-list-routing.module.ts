import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RoomComponent } from './components/room/room.component';
import { RoomResolver } from './resolvers/room.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: ListComponent },
  {path: ':id', component: RoomComponent, resolve: {room: RoomResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomListRoutingModule {
}
