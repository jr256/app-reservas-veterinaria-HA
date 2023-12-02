import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recojo } from '../models/recojo.model';
import { AppSettings } from '../app.settings';
import { Observable, tap } from 'rxjs';


const baseUrlRecojo =  AppSettings.API_ENDPOINT + "/recojo";


@Injectable({
  providedIn: 'root'
})
export class RecojoService {

  constructor(private http:HttpClient) { }

  programarRecojo(recojo: Recojo): Observable<any> {
    console.log("API: Objeto",JSON.stringify(recojo));
    return this.http.post(baseUrlRecojo + "/programar", recojo);
  }

  listarRecojosProgramados(fecha: Date): Observable<Recojo[]> {
    const fechaFormato = fecha.toISOString().split('T')[0];
    const params = new HttpParams().set("fecha", fechaFormato);
  
    console.log("URL: " + baseUrlRecojo);
    console.log("Parameters: ", params.toString());
  
    return this.http.get<Recojo[]>(baseUrlRecojo + "/reservados", { params })
            .pipe(
                tap(data => console.log('API Response: ', data))
            );
  }




}
