import { BaseFieldModel, IBaseFieldModel } from '../common/base-field.model';
import { FieldTypes } from '../common/field-types';

export class ButtonModel extends BaseFieldModel implements IButtonModel {

  fieldType: FieldTypes = FieldTypes.Button;

  type: ButtonTypeEnum;
  label: string;
  color: ButtonColorEnum;
  disabled: boolean;
  icon: string;
  appearance: ButtonAppearanceEnum

  constructor(
    field: IButtonModel
  ) {
    super(field);
  }
}

export interface IButtonModel extends IBaseFieldModel {
  type: ButtonTypeEnum;
  label: string;
  color: ButtonColorEnum;
  disabled?: boolean;
  icon?: string;
  appearance?: ButtonAppearanceEnum;
}

export enum ButtonTypeEnum {
  Submit,
  Button,
  Reset
}

export enum ButtonColorEnum {
  Primary,
  Secondary,
  Success,
  Info,
  Warning,
  Help,
  Danger
}

export enum ButtonAppearanceEnum {
  Severities,
  Raised,
  Rounded,
  Text,
  RaisedText,
  Outlined
}
