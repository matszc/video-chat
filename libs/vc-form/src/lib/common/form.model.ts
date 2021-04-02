import { BaseFieldModel } from './base-field.model';
import { ValidatorFn } from '@angular/forms';

export interface FormModel {
  fields: BaseFieldModel[];
  validators?: ValidatorFn | ValidatorFn[] | null;
}
