import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldDirective } from './directives/field.directive';
import { InputFieldComponent } from './components/input-filed/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldComponent } from './containers/field/field.component';
import { FormComponent } from './containers/form/form.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputSizeDirective } from './components/input-filed/directives/input-size.directive';
import { MapPipe } from './pipes/map.pipe';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from './components/button/button.component';
import { ColorClassPipe } from './components/button/pipes/color-class.pipe';
import { AppearanceClassPipe } from './components/button/pipes/appearance-class.pipe';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ButtonTypePipe } from './components/button/pipes/button-type.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, RippleModule, ButtonModule],
  declarations: [ FieldDirective, InputFieldComponent, FieldComponent, FormComponent, InputSizeDirective, MapPipe, InputPasswordComponent, ButtonComponent, ColorClassPipe, AppearanceClassPipe, ButtonTypePipe],
  exports: [FormComponent, FieldComponent]
})
export class VcFormModule {}
