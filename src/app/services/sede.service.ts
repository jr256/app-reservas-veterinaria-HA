import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const baseUrlSede =  AppSettings.API_ENDPOINT + "/sede";

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  listarSedes(): Observable<Sede[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken() 
    });

    return this.http.get<Sede[]>(baseUrlSede, { headers: headers });
  }

}
