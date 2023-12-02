import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

const baseUrl =  AppSettings.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(private http: HttpClient) {
  }

  public checkIfEmailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(baseUrl + "/users?email=" + email);
  }
}
