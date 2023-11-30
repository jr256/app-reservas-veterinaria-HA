import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

const baseUrlServicio =  AppSettings.API_ENDPOINT + "/servicio";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  listarServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(baseUrlServicio);
  }

}
