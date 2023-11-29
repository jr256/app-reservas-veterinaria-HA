import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { AppSettings } from '../app.settings';
import { map } from "rxjs/operators";


const baseUrlUrlConsulta =  AppSettings.API_ENDPOINT + "/consulta";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http:HttpClient) { }

  listarConsultasDisponibles(
    sede:number,
    especialidad:number
    ):Observable<Consulta[]>{

     const params = new HttpParams()
     .set("sede", sede.toString())
     .set("especialidad", especialidad.toString());

return  this.http.get<Consulta[]>(baseUrlUrlConsulta +"/disponibles", {params}); 
}  

}
