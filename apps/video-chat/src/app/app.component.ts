import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@vc/api-interfaces';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { LayoutContainerFacade } from './modules/layout-container/+state/layout-container.facade';

@Component({
  selector: 'vc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private layoutContainerFacade: LayoutContainerFacade) {
    this.layoutContainerFacade.getTokens()
    this.layoutContainerFacade.setSilentRenew();
  }
}
