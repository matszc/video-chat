import { Component, OnInit } from '@angular/core';
import { FormModel } from '../../../../../../../../libs/vc-form/src/lib/common/form.model';
import {
  InputFieldModel,
  InputFieldType
} from '../../../../../../../../libs/vc-form/src/lib/fields-models/input-field.model';
import { Validators } from '@angular/forms';
import { VcCustomValidators } from '../../../../../../../../libs/vc-form/src/lib/helpers/vc-custom-validators';
import {
  ButtonColorEnum,
  ButtonModel,
  ButtonTypeEnum
} from '../../../../../../../../libs/vc-form/src/lib/fields-models/button.model';

@Component({
  selector: 'vc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formModel: FormModel

  constructor() { }

  ngOnInit(): void {
    this.loadForm();
  }

  submitted(v: any): void {

  }

  private loadForm(): void {
    this.formModel = {
      fields: [
        new InputFieldModel({
          name: 'login',
          type: InputFieldType.Text,
          placeholder: 'Login',
          validators: [Validators.required, Validators.minLength(4), Validators.maxLength(16)],
          errors: {
            required: 'Login jest wymagane',
            minlength: 'Login jest za krótki',
            maxlength: 'Login jest za długi'
          }
        }),
        new InputFieldModel({
          name: 'email',
          type: InputFieldType.Text,
          placeholder: 'Email',
          validators: [Validators.required, Validators.email],
          errors: {
            required: 'Email jest wymagany',
            email: 'Nieprawidłowy format'
          }
        }),
        new InputFieldModel({
          name: 'password',
          type: InputFieldType.Password,
          validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
          placeholder: 'Hasło',
          errors: {
            required: 'Hasło jest wymagane',
            minlength: 'Hasło jest za krótkie',
            maxlength: 'Hasło jest za długie'
          }
        }),
        new InputFieldModel({
          name: 'password_match',
          type: InputFieldType.Password,
          placeholder: 'Powtórz hasło',
          errors: {
            mustMatch: 'Hasła nie są identyczne'
          }
        }),
        new ButtonModel({
          name: 'submit',
          type: ButtonTypeEnum.Submit,
          color: ButtonColorEnum.Primary,
          label: 'Zarejestruj'
        })
      ],
      validators: [VcCustomValidators.mustMatch('password_match', 'password', )]
    }
  }

}
