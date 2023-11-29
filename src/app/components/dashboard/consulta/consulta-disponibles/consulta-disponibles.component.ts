import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from 'src/app/models/consulta.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Sede } from 'src/app/models/sede.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-consulta-disponibles',
  templateUrl: './consulta-disponibles.component.html',
  styleUrls: ['./consulta-disponibles.component.css']
})
export class ConsultaDisponiblesComponent {

   //Grila
   dataSource:any;

   //Clase para la paginacion
   @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

   //Cabecera
   displayedColumns = ["Sede","Especialidad","Veterinario","Fecha","Hora"];

   sedeSeleccionadaId:number = -1;
    especialidadSeleccionadaId:number = -1;
 
  sede: Sede[] = [];
  especialidad: Especialidad[] = [];
  
  
  
  constructor(
    private sedeService:SedeService, 
    private especialidadService:EspecialidadService , 
    private consultaService:ConsultaService){
      
       
    this.sedeService.listarSedes().subscribe(
              x => this.sede = x
      );

      this.especialidadService.listarEspecialidades().subscribe(
              x => this.especialidad = x
      );
  }

  listarConsultasDisponibles(){
    console.log(">> sede >> " + this.sede) ;
    console.log(">> especialidad >> " + this.especialidad) ;

    if (this.sedeSeleccionadaId && this.especialidadSeleccionadaId) {
      this.consultaService.listarConsultasDisponibles(this.sedeSeleccionadaId, this.especialidadSeleccionadaId).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Consulta>(x);
          this.dataSource.paginator = this.paginator;
        }
      );
    } else {
      // Manejar caso cuando no se ha seleccionado sede o especialidad
    }





  }




}
