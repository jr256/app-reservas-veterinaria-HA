import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Servicio } from 'src/app/models/servicio.model';
import { RecojoService } from 'src/app/services/recojo.service';
import { ServicioService } from 'src/app/services/servicio.service';


@Component({
  selector: 'app-recojo-reserva',
  templateUrl: './recojo-reserva.component.html',
  styleUrls: ['./recojo-reserva.component.css']
})
export class RecojoReservaComponent {

  servicioSeleccionadoId:number = -1;

  servicio: Servicio[] = [];
  distritosCobertura = ['San Miguel', 'Magdalena', 'Pueblo Libre', 'Jesús María', 'Lince', 'Breña', 'Cercado de Lima', 'San Isidro', 'Miraflores',  'San Martín de Porres', 'Los Olivos',  'Bellavista'];

 
  formulario = new FormGroup({
    codigoMascota: new FormControl('', Validators.required),
    nombreMascota: new FormControl('', Validators.required),
    fechaRecojo: new FormControl('', Validators.required),
    tipoServicio: new FormControl('', Validators.required),
    distrito: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
  });


  constructor(
    private servicioService:ServicioService, 
    private recojoService:RecojoService){
      
       
    this.servicioService.listarServicios().subscribe(
              x => this.servicio = x
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

  enviarFormulario() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      // Manejo de errores o validaciones
    }
  }

}
