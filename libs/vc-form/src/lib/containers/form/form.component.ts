import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormModel } from '../../common/form.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseFieldModel } from '../../common/base-field.model';
import { FieldTypes } from '../../common/field-types';

@Component({
  selector: 'vc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  formConfig: FormModel;

  @Output()
  submitted: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.loadForm(this.formConfig);
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.submitted.emit(this.formGroup.getRawValue());
    }
  }

  private loadForm({ fields, validators }: FormModel): FormGroup {
    const fg: FormGroup = this.fb.group([], {validators});

    fields.filter(i => i.fieldType !== FieldTypes.Button).forEach((f: BaseFieldModel) => {
      fg.addControl(f.name, this.fb.control({value: '', disabled: f.disabled}, f.validators));
    });

    return fg;
  }

}
