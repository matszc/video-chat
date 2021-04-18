import { Component, OnInit } from '@angular/core';
import { FormModel } from '../../../../../../../../libs/vc-form/src/lib/common/form.model';
import {
  InputFieldModel,
  InputFieldType
} from '../../../../../../../../libs/vc-form/src/lib/fields-models/input-field.model';
import { Validators } from '@angular/forms';
import {
  ButtonColorEnum,
  ButtonModel,
  ButtonTypeEnum
} from '../../../../../../../../libs/vc-form/src/lib/fields-models/button.model';
import { LoginUserModel } from '../../../../../../../../libs/api-interfaces/src/lib/user/login-user.model';
import { LoginFacade } from '../../+state/login.facade';

@Component({
  selector: 'vc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formModel: FormModel

  constructor(
    private loginFacade: LoginFacade
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  submitted(v: LoginUserModel): void {
    v.rememberUser = true; //TODO implement remember user option
    this.loginFacade.login(v);
  }

  private loadForm(): void {
    this.formModel = {
      fields: [
        new InputFieldModel({
          name: 'loginOrEmail',
          type: InputFieldType.Text,
          validators: [Validators.required],
          errors: {
            required: 'Login jest wymagany'
          },
          placeholder: 'Login'
        }),
        new InputFieldModel({
          name: 'password',
          type: InputFieldType.Password,
          validators: [Validators.required],
          errors: {
            required: 'Hasło jest wymagane'
          },
          placeholder: 'Hasło'
        }),
        new ButtonModel({
          name: 'submit',
          type: ButtonTypeEnum.Submit,
          color: ButtonColorEnum.Primary,
          label: 'Zaloguj'
        })
      ]
    }
  }

}
