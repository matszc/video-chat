import { Pipe, PipeTransform } from '@angular/core';
import { ButtonColorEnum } from '../../../fields-models/button.model';

@Pipe({
  name: 'colorClass'
})
export class ColorClassPipe implements PipeTransform {

  transform(value: ButtonColorEnum, ...args: unknown[]): unknown {
    switch (value) {
      case ButtonColorEnum.Danger: return 'p-button-secondary'
      case ButtonColorEnum.Help: return 'p-button-help'
      case ButtonColorEnum.Info: return 'p-button-info'
      case ButtonColorEnum.Primary: return ''
      case ButtonColorEnum.Secondary: return 'p-button-secondary'
      case ButtonColorEnum.Success: return 'p-button-success'
      case ButtonColorEnum.Warning: return 'p-button-warning'
      default: return ''
    }
  }

}
