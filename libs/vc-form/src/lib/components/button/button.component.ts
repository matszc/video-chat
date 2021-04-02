import { Component, OnInit } from '@angular/core';
import { BaseField } from '../../common/base-field';
import { ButtonModel } from '../../fields-models/button.model';

@Component({
  selector: 'vc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseField<ButtonModel> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
