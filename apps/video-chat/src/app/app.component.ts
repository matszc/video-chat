import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@vc/api-interfaces';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>(environment.api + '/api/hello').pipe(
    map(t => t.message)
  )
  constructor(private http: HttpClient) {
  }
}
