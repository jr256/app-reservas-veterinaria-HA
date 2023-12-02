import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Recojo } from 'src/app/models/recojo.model';
import { RecojoService } from 'src/app/services/recojo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reporte-recojos',
  templateUrl: './reporte-recojos.component.html',
  styleUrls: ['./reporte-recojos.component.css']
})
export class ReporteRecojosComponent {

  //Grila
  dataSource:any;

  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
 
  //Cabecera
  displayedColumns = ["Fecha","Servicio","Distrito","Mascota", "Dueño"];

  fechaRecojoSeleccionada: Date | null = null;

  recojos: Recojo[] = [];
 
  constructor(
    private dialogService: MatDialog,
    private recojoService:RecojoService){
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

  listarRecojos(){
    console.log(">> fecha >> " + this.fechaRecojoSeleccionada);

    if (this.fechaRecojoSeleccionada) {
        this.recojoService.listarRecojosProgramados(this.fechaRecojoSeleccionada).subscribe(
            x => {
                this.dataSource = new MatTableDataSource<Recojo>(x);
                this.dataSource.paginator = this.paginator;
            }
        );
    } else {
        // Manejar caso cuando no se ha seleccionado la fecha
    }
  }

}
