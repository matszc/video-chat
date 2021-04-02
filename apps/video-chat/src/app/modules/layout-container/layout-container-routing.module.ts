import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';

const routes: Routes = [
  {path: '', component: LayoutContainerComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'auth'},
      {path: 'auth', loadChildren: () => import('../login/login.module').then(m => m.LoginModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutContainerRoutingModule { }
