import { Pipe, PipeTransform } from '@angular/core';
import { ButtonAppearanceEnum } from '../../../fields-models/button.model';

@Pipe({
  name: 'appearanceClass'
})
export class AppearanceClassPipe implements PipeTransform {

  transform(value: ButtonAppearanceEnum): unknown {
    switch (value) {
      case ButtonAppearanceEnum.Raised: return 'p-button-raised'
      case ButtonAppearanceEnum.Outlined: return 'p-button-outlined'
      case ButtonAppearanceEnum.RaisedText: return 'p-button-raised p-button-text'
      case ButtonAppearanceEnum.Rounded: return 'p-button-rounded'
      case ButtonAppearanceEnum.Severities: return 'p-button'
      case ButtonAppearanceEnum.Text: return 'p-button-text'
      default: return 'p-button-raised'
    }
  }

}
