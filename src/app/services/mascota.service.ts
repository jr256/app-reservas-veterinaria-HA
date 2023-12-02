import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota.model';
import { AppSettings } from '../app.settings';
import {PageResponse} from '../models/page.response.model';

const baseUrlMascota =  AppSettings.API_ENDPOINT + "/mascota";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http: HttpClient) { }

  getMascotaByEmail(email: string): Observable<Mascota> {
    //return this.http.get<Mascota>(baseUrlMascota + "/find?email=" + email);
    const url = baseUrlMascota + "/find?email=" + email;
    console.log('Sending GET request to', url);
    return this.http.get<Mascota>(url);

  }

  saveMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(baseUrlMascota + "/save", mascota);
  }

  searchMascotas(keyword: string,  currentPage: number, pageSize: number): Observable<PageResponse<Mascota>>  {
   return this.http.get<PageResponse<Mascota>>(baseUrlMascota + "/search?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

}
