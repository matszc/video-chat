import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostUserModel } from '../../../../../../../libs/api-interfaces/src/lib/user/post-user.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginUserModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user.model';
import { LoginUserResponseModel } from '../../../../../../../libs/api-interfaces/src/lib/user/login-user-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  register(payload: PostUserModel): Observable<any> {
    return this.http.post(`${environment.api}/users/register`, payload);
  }

  login(payload: LoginUserModel): Observable<LoginUserResponseModel> {
    return this.http.post<LoginUserResponseModel>(`${environment.api}/users/login`, payload, {withCredentials: true});
  }
}
