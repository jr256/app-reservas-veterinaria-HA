import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad.model';


const baseUrlEspecialidad =  AppSettings.API_ENDPOINT + "/especialidad";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {


  constructor(private http: HttpClient) { }

  listarEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(baseUrlEspecialidad );
  }
}
