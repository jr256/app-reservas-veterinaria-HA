import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DistritoCobertura } from '../models/distritocobertura.model';
import { AppSettings } from '../app.settings';
import { Observable, tap } from 'rxjs';


const baseUrlDistritoCobertura =  AppSettings.API_ENDPOINT + "/cobertura";

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor(private http: HttpClient) { }


  listarDistritos(): Observable<DistritoCobertura[]> {
    return this.http.get<DistritoCobertura[]>(baseUrlDistritoCobertura)
      .pipe(
        tap(data => console.log('API Distrito Response: ', data))
      );
  }
}
