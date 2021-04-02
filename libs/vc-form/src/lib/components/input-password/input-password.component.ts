import { Component, OnInit } from '@angular/core';
import { BaseField } from '../../common/base-field';
import { InputPasswordModel } from '../../fields-models/input-password.model';

@Component({
  selector: 'vc-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent extends BaseField<InputPasswordModel> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
