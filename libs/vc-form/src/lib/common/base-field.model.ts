import { FieldTypes } from './field-types';
import { ValidatorFn } from '@angular/forms';

export abstract class BaseFieldModel implements IBaseFieldModel {

  abstract fieldType: FieldTypes;

  name: string;
  placeholder: string;
  validators: ValidatorFn[];
  errors: { [key: string]: string }
  disabled: boolean;

  protected constructor(
    field: IBaseFieldModel
  ) {
    for (let fieldKey in field) {
      this[fieldKey] = field[fieldKey];
    }

    if (this.disabled === undefined) {
      this.disabled = false;
    }
  }

}


export interface IBaseFieldModel {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  validators?: ValidatorFn[];
  errors?: { [key: string]: string }
}
