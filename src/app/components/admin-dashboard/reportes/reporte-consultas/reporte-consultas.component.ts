import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from 'src/app/models/consulta.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Sede } from 'src/app/models/sede.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { SedeService } from 'src/app/services/sede.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-reporte-consultas',
  templateUrl: './reporte-consultas.component.html',
  styleUrls: ['./reporte-consultas.component.css']
})
export class ReporteConsultasComponent {

    //Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
   
 
    //Cabecera
    displayedColumns = ["Sede","Especialidad","Veterinario","Fecha","Mascota", "Dueño", "Hora"];
 
     sedeSeleccionadaId:number = -1;
     especialidadSeleccionadaId:number = -1;
     fechaSeleccionada: Date | null = null;
  
   sede: Sede[] = [];
   especialidad: Especialidad[] = [];
   
 
     
   constructor(
     private dialogService: MatDialog,
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
 
   filtroFecha = (date: Date | null): boolean => {
     if (!date) {
       return false;
     }
     const currentDate = new Date();
     const tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
     const sevenDaysAhead = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
     return date >= tomorrow && date <= sevenDaysAhead;
   }
 
   agregarEvento(event: MatDatepickerInputEvent<Date>) {
     console.log('Fecha seleccionada:', event.value);
   }
 
   listarConsultasReservadas(){
     console.log(">> sede >> " + this.sedeSeleccionadaId);
     console.log(">> especialidad >> " + this.especialidadSeleccionadaId);
     console.log(">> fecha >> " + this.fechaSeleccionada);
 
     if (this.sedeSeleccionadaId && this.especialidadSeleccionadaId && this.fechaSeleccionada) {
         this.consultaService.listarConsultasReservas(this.sedeSeleccionadaId, this.especialidadSeleccionadaId, this.fechaSeleccionada).subscribe(
             x => {
                 this.dataSource = new MatTableDataSource<Consulta>(x);
                 this.dataSource.paginator = this.paginator;
             }
         );
     } else {
         // Manejar caso cuando no se ha seleccionado sede, especialidad o fecha
     }
   }
 

 
   

}
