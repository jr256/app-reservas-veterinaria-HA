import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recojo } from '../models/recojo.model';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';


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


}
