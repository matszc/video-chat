import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserResponseModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  tryRefreshToken(): Observable<LoginUserResponseModel> {
    return this.http.get<LoginUserResponseModel>(`${environment.api}/users/tryRefreshToken`);
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${environment.api}/users/logout`);
  }
}
