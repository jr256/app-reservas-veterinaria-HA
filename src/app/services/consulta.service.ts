import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { AppSettings } from '../app.settings';
import { tap } from "rxjs/operators";
import { AuthService } from './auth.service';


const baseUrlConsulta =  AppSettings.API_ENDPOINT + "/consulta";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http:HttpClient, private authService: AuthService) { }

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


     //Captura de token
     const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken() 
    });

     console.log("URL: " + baseUrlConsulta);
     console.log("Parameters: ", params.toString());

 
 
    return this.http.get<Consulta[]>(baseUrlConsulta + "/disponibles", { params,  headers })
            .pipe(
                tap(data => console.log('API Response: ', data))
            );
      }
      
      
    reservarConsulta(consulta: Consulta): Observable<any> {


      console.log("API: Objeto",JSON.stringify(consulta));


      //Captura de token
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getToken() 
      });

      return this.http.put(baseUrlConsulta + "/reservar", consulta, { headers });
    }

}
