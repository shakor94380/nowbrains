import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/shared/interfaces/account';
import { Login } from 'src/app/shared/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  constructor(private http: HttpClient) { }
  loggingInfo: any;

  login(username: string, password: string) {
    const data: Login = {
      username: username,
      password: password
    }
    return this.http.post<Login>('accounts/login', {data})
  }

  logout() {
    localStorage.clear();
  }

  register(data: Account) {
    return this.http.post<Account>('accounts', {data})
  }
}
