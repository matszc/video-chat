import { Pipe, PipeTransform } from '@angular/core';
import { ButtonTypeEnum } from '../../../fields-models/button.model';

@Pipe({
  name: 'buttonType'
})
export class ButtonTypePipe implements PipeTransform {

  transform(value: ButtonTypeEnum): unknown {
    switch (value) {
      case ButtonTypeEnum.Button: return 'button';
      case ButtonTypeEnum.Reset: return 'reset';
      case ButtonTypeEnum.Submit: return 'submit';
      default: return 'button';
    }
  }

}
