import { Especialidad } from "./especialidad.model";
import { Sede } from "./sede.model";
import { Hora } from "./hora.model";
import { Veterinario } from "./veterinario.model";

export class Consulta {

    idconsulta?:number;
    sede?:Sede;
    especialidad?:Especialidad;
    hora?:Hora;
    fecha?:string;
   
    veterinario?:Veterinario;
    idmascota?:number;
    idestadoservicio?:number;


}