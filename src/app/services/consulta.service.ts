import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { AppSettings } from '../app.settings';
import { tap } from "rxjs/operators";


const baseUrlUrlConsulta =  AppSettings.API_ENDPOINT + "/consulta";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http:HttpClient) { }

  listarConsultasDisponibles(
    sede:number,
    especialidad:number,
    fecha: Date
    ):Observable<Consulta[]>{
      const fechaFormato = fecha.toISOString().split('T')[0];
     const params = new HttpParams()
     .set("idsede", sede.toString())
     .set("idespecialidad", especialidad.toString())
     .set("fecha", fechaFormato);

     console.log("URL: " + baseUrlUrlConsulta);
     console.log("Parameters: ", params.toString());

 //return  this.http.get<Consulta[]>(baseUrlUrlConsulta +"/disponibles", {params});
 
 return this.http.get<Consulta[]>(baseUrlUrlConsulta + "/disponibles", { params })
        .pipe(
            tap(data => console.log('API Response: ', data))
        );
}  

}
