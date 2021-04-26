import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerRoutingModule } from './layout-container-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLayoutContainer from './+state/layout-container.reducer';
import { LayoutContainerEffects } from './+state/layout-container.effects';
import { LayoutContainerFacade } from './+state/layout-container.facade';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import { MenubarModule } from 'primeng/menubar';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

@NgModule({
  declarations: [LayoutContainerComponent],
  imports: [
    CommonModule,
    LayoutContainerRoutingModule,
    StoreModule.forFeature(
      fromLayoutContainer.LAYOUTCONTAINER_FEATURE_KEY,
      fromLayoutContainer.reducer
    ),
    EffectsModule.forFeature([LayoutContainerEffects]),
    MenubarModule
  ],
  providers: [LayoutContainerFacade, AuthGuard, UnAuthGuard],
})
export class LayoutContainerModule {}
