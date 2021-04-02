import { Component, OnInit } from '@angular/core';
import { BaseField } from '../../common/base-field';
import { InputFieldModel, InputFieldType } from '../../fields-models/input-field.model';

@Component({
  selector: 'vc-form',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent extends BaseField<InputFieldModel> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getType(type: InputFieldType): string {
    switch (type) {
      case InputFieldType.Number: return 'number';
      case InputFieldType.Password: return 'password'
      case InputFieldType.Text: return 'text';
      default: return 'text';
    }
  }

}
