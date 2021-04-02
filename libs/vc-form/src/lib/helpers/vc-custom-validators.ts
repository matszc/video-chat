import { AbstractControl, ValidatorFn } from '@angular/forms';

export class VcCustomValidators {


  static mustMatch(name: string, compareName: string): ValidatorFn {
    return ((control: AbstractControl) => {
      const v1: AbstractControl = control.get(name);
      const v2: AbstractControl = control.get(compareName);

      if (v1 == null) {
        return null;
      }

      v1.setErrors(v1.value !== v2.value ? {mustMatch: true} : null)

      return null;
    })
  }

}
