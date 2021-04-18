import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VcFormModule } from '@vc/vc-form';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLogin from './+state/login.reducer';
import { LoginEffects } from './+state/login.effects';
import { LoginFacade } from './+state/login.facade';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    VcFormModule,
    StoreModule.forFeature(fromLogin.LOGIN_FEATURE_KEY, fromLogin.reducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  providers: [LoginFacade],
})
export class LoginModule {}
