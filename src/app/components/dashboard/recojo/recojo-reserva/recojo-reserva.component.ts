import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DistritoCobertura } from 'src/app/models/distritocobertura.model';
import { Recojo } from 'src/app/models/recojo.model';
import { Servicio } from 'src/app/models/servicio.model';
import { DistritoService } from 'src/app/services/distrito.service';
import { RecojoService } from 'src/app/services/recojo.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MascotaService } from 'src/app/services/mascota.service';


@Component({
  selector: 'app-recojo-reserva',
  templateUrl: './recojo-reserva.component.html',
  styleUrls: ['./recojo-reserva.component.css']
})
export class RecojoReservaComponent {

  servicioSeleccionadoId:number = -1;

  servicio: Servicio[] = [];
  distritosCobertura: DistritoCobertura [] = [];

  idmascota?: number;

  formularioRecojo = new FormGroup({
  
    fechaRecojo: new FormControl('', Validators.required),
    tipoServicio: new FormControl('', Validators.required),
    distrito: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
  });


  recojo: Recojo = { 
    idrecojo:0,
    servicio:{idservicio:0, servicio:""},
    distrito:{iddistrito:0, distrito:""},  
    fecha: "",
    direccion: "",
    mascota:{idmascota:0}
    //idmascota: 0

};


  constructor(
    private servicioService:ServicioService,
    private distritoService: DistritoService, 
    private recojoService:RecojoService,
    private formBuilder : FormBuilder,
    private authService: AuthService, 
    private mascotaService: MascotaService,
    private snackBar: MatSnackBar,
    private router: Router){
      
       
      this.servicioService.listarServicios().subscribe(
              x => this.servicio = x
      );

      this.distritoService.listarDistritos().subscribe(
        x => this.distritosCobertura = x
      );

  
    }

    
  ngOnInit() {
    const username = this.authService.getUsername();
    if (username) {
      this.mascotaService.getMascotaByEmail(username).subscribe(mascota => {
        this.idmascota = mascota.idmascota;
      });
    }
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


  programarRecojo() {
    if (this.formularioRecojo.valid) {
      const recojo: Recojo = {
        mascota: { idmascota: this.idmascota || 0 },   
        //idmascota: this.recojo.idmascota,     
        fecha: this.formularioRecojo.get('fechaRecojo')?.value ? new Date(this.formularioRecojo.get('fechaRecojo')?.value as string).toISOString().split('T')[0] : '',
        servicio: { idservicio: Number(this.formularioRecojo.get('tipoServicio')?.value) || 0 },
        distrito: { iddistrito: Number(this.formularioRecojo.get('distrito')?.value) || 0 },
        direccion: this.formularioRecojo.get('direccion')?.value || ''
      };
  
      this.recojoService.programarRecojo(recojo).subscribe(
        x => {
          console.log("Reserva realizada con exito");
          this.formularioRecojo.reset();
          this.snackBar.open('Reserva realizada con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard/recojo']);});
        });
    } else {
      console.error('El formulario no es válido');
    }
  }



}
