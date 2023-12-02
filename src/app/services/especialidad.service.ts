import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad.model';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';


const baseUrlEspecialidad =  AppSettings.API_ENDPOINT + "/especialidad";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {


  constructor(private http: HttpClient, private authService: AuthService) { }

  listarEspecialidades(): Observable<Especialidad[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken() 
    });

    return this.http.get<Especialidad[]>(baseUrlEspecialidad , { headers: headers });
  }
}
