import { BaseFieldModel, IBaseFieldModel } from '../common/base-field.model';
import { FieldTypes } from '../common/field-types';

export class InputPasswordModel extends BaseFieldModel implements IInputPasswordModel {

  fieldType: FieldTypes = FieldTypes.Password;

  weekLabel: string;
  mediumLabel: string;
  strongLabel: string;

  constructor(
    protected field: IInputPasswordModel
  ) {
    super(field);
  }
}


export interface IInputPasswordModel extends IBaseFieldModel {
  weekLabel: string;
  mediumLabel: string;
  strongLabel: string;
}
