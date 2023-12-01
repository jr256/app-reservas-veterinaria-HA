import { DistritoCobertura } from "./distritocobertura.model";
import { Mascota } from "./mascota.model";
import { Servicio } from "./servicio.model";

export class Recojo {

    idrecojo?:number;
    servicio?:Servicio;
    distrito?:DistritoCobertura;
    fecha?:string;
    direccion?:string;
    mascota?:Mascota
    
}
