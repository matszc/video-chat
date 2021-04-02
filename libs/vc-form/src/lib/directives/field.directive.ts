import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseFieldModel } from '../common/base-field.model';
import { FieldTypes } from '../common/field-types';
import { InputFieldComponent } from '../components/input-filed/input-field.component';
import { InputPasswordComponent } from '../components/input-password/input-password.component';
import { BaseField } from '../common/base-field';
import { ButtonComponent } from '../components/button/button.component';

@Directive({
  selector: '[vcField]'
})
export class FieldDirective implements OnInit {

  @Input()
  control: FormControl;

  @Input()
  config: BaseFieldModel;

  component: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const component: any = this.getComponentByFieldType(this.config.fieldType);
    const factory: any = this.resolver.resolveComponentFactory<any>(component);

    this.component = this.containerRef.createComponent(factory);
    this.component.instance.field = this.config;
    this.component.instance.control = this.control;
  }

  getComponentByFieldType(type: FieldTypes): any {
    switch (type) {
      case FieldTypes.Input: return InputFieldComponent;
      case FieldTypes.Password: return InputPasswordComponent;
      case FieldTypes.Button: return ButtonComponent;
      default: return InputFieldComponent;
    }
  }

}
