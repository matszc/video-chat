import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLayoutContainer from './+state/layout-container.reducer';
import { LayoutContainerEffects } from './+state/layout-container.effects';
import { LayoutContainerFacade } from './+state/layout-container.facade';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VcFormModule } from '@vc/vc-form';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    StoreModule.forFeature(
      fromLayoutContainer.LAYOUTCONTAINER_FEATURE_KEY,
      fromLayoutContainer.reducer
    ),
    EffectsModule.forFeature([LayoutContainerEffects]),
    VcFormModule
  ],
  providers: [LayoutContainerFacade],
})
export class LoginModule {}
