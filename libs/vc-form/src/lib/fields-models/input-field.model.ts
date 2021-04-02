import { BaseFieldModel, IBaseFieldModel } from '../common/base-field.model';
import { FieldTypes } from '../common/field-types';

export class InputFieldModel extends BaseFieldModel implements IInputFieldModel {

  fieldType: FieldTypes = FieldTypes.Input;

  type: InputFieldType;
  label: string;
  iconRight: string;
  iconLeft: string;
  size: InputSizeEnum;

  constructor(field: IInputFieldModel) {
    super(field);

    if (this.size === undefined) {
      this.size = InputSizeEnum.Medium;
    }
  }
}


export interface IInputFieldModel extends IBaseFieldModel {
  type: InputFieldType;
  label?: string;
  iconRight?: string;
  iconLeft?: string;
  size?: InputSizeEnum;
}

export enum InputFieldType {
  Text,
  Password,
  Number
}

export enum InputSizeEnum {
  Small,
  Medium,
  Large
}
