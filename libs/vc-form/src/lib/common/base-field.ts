import { FormControl } from '@angular/forms';

export abstract class BaseField<T> {

  field: T;

  control: FormControl;

  protected constructor() { }

  hasError(err: string): boolean {
    return this.control.hasError(err) && this.control.touched;
  }

}
