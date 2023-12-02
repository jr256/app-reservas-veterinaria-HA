import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';

const baseUrlSede =  AppSettings.API_ENDPOINT + "/sede";

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http: HttpClient) { }

  listarSedes(): Observable<Sede[]> {


    return this.http.get<Sede[]>(baseUrlSede);
  }

}
