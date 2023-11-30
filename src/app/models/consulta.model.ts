import { Especialidad } from "./especialidad.model";
import { Sede } from "./sede.model";

export class Consulta {

    idconsulta?:number;
    idsede?:Sede;
    idespecialidad?:Especialidad;
    fecha?:string;
    idhora?:number;
    idveterinario?:number;
    idmascota?:number;
    idestadoservicio?:number;


}