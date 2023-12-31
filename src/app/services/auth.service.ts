import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../app.settings';
import { LoggedUser } from '../models/logged-user.model';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Mascota } from '../models/mascota.model';
import { MascotaService } from './mascota.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService = new JwtHelperService();
  user = new BehaviorSubject<LoggedUser | null>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private mascotaService: MascotaService) {}

  public login(user: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http.post<LoginResponse>(AppSettings.API_ENDPOINT + "/login", formData);
  }

  saveToken(jwtTokens: LoginResponse) {
    const decodedAccessToken = this.jwtHelperService.decodeToken(jwtTokens.accessToken);
    const loggedUser = new LoggedUser(decodedAccessToken.sub, decodedAccessToken.roles, jwtTokens.accessToken, this.getExpirationDate(decodedAccessToken.exp),undefined);
    this.user.next(loggedUser);
    this.autoLogout(this.getExpirationDate(decodedAccessToken.exp).valueOf() - new Date().valueOf());
    localStorage.setItem('userData', JSON.stringify(loggedUser));

    this.redirectLoggedInUser(decodedAccessToken, jwtTokens.accessToken);
  }

  redirectLoggedInUser(decodedToken: any, accessToken: string) {
    if (decodedToken.roles.includes("Admin")) this.router.navigateByUrl("/admin-dashboard");
    else if (decodedToken.roles.includes("Customer")) 
    this.mascotaService.getMascotaByEmail(decodedToken.sub).subscribe(
      mascota => { 
        const loggedUser = new LoggedUser(decodedToken.sub, decodedToken.roles, accessToken, this.getExpirationDate(decodedToken.exp), mascota);
        this.user.next(loggedUser);
        localStorage.setItem('userData', JSON.stringify(loggedUser));
        this.router.navigateByUrl("/dashboard");
  })}

  autoLogin() {
    const userData: {
      username: string,
      roles: string[],
      _token: string,
      _expiration: Date,
      mascota: Mascota | undefined,
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) return;
    const loadedUser = new LoggedUser(userData.username, userData.roles, userData._token, new Date(userData._expiration), userData.mascota);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(loadedUser._expiration.valueOf() - new Date().valueOf());
    }
  }


  refreshMascota() {
    const userData: {
      username: string,
      roles: string[],
      _token: string,
      _expiration: Date,
      mascota: Mascota | undefined,
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) return;
    const loadedUser = new LoggedUser(userData.username, userData.roles, userData._token, new Date(userData._expiration), userData.mascota);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(loadedUser._expiration.valueOf() - new Date().valueOf());
    }
  }



  getToken(): string | null {
    const user = this.user.value;
    return user ? user.token : null;
  }

  logout() {
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  getExpirationDate(exp: number) {
    const date = new Date(0);
    date.setUTCSeconds(exp);
    return date;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  
  getUsername(): string | null {
    const userData: {
      username: string,
      roles: string[],
      _token: string,
      _expiration: Date
    } = JSON.parse(localStorage.getItem('userData')!);
    return userData ? userData.username : null;
  }

}
