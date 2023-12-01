import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from 'src/app/models/consulta.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Sede } from 'src/app/models/sede.model';
import { ConsultaService } from 'src/app/services/consulta.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { SedeService } from 'src/app/services/sede.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-consulta-reserva',
  templateUrl: './consulta-reserva.component.html',
  styleUrls: ['./consulta-reserva.component.css']
})
export class ConsultaReservaComponent {

  formsRegistra = this.formBuilder.group({ 
    idespecialidad: [''],
    idsede: [''],
    idveterinario: [''],
    fecha: [''],
    idestadoservicio: ['']
});


  consulta: Consulta = { 
    idconsulta:0,
    especialidad:{idespecialidad:0, especialidad:""},
    sede:{idsede:0, sede:""},
    veterinario:{idveterinario:0, nombrecompleto:""},
    fecha: "",
    hora:{idhora:0, hora:""},
    idestadoservicio: 0,
    idmascota: 0
};




  constructor( private formBuilder: FormBuilder
    ,private dialogService: MatDialog,
    private sedeService:SedeService, 
    private especialidadService:EspecialidadService , 
    private consultaService:ConsultaService,
    public dialogRef: MatDialogRef<ConsultaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){

      this.consulta = data;
      console.log("idconsulta: "+this.consulta.idconsulta);
      console.log("idespecialidad: " + this.consulta.especialidad?.especialidad);
      console.log("idsede: "+ this.consulta.sede?.sede);
      console.log("hora: "+ this.consulta.hora?.hora);
      
      console.log("idveterinario: "+this.consulta.veterinario?.nombrecompleto);
      console.log("fecha: "+this.consulta.fecha);
      console.log("idestadoservicio: "+this.consulta.idestadoservicio);
      console.log("idmascota: "+this.consulta.idmascota);

  }

  confirmarReserva() {
    if (this.consulta && this.consulta.sede && this.consulta.especialidad && this.consulta.hora && this.consulta.veterinario) {
      const consultaToSend = {
        idconsulta: this.consulta.idconsulta,
        sede: { idsede: this.consulta.sede.idsede },
        especialidad: { idespecialidad: this.consulta.especialidad.idespecialidad },
        fecha: this.consulta.fecha,
        hora: { idhora: this.consulta.hora.idhora },
        veterinario: { idveterinario: this.consulta.veterinario.idveterinario },
        mascota: { idmascota: this.consulta.idmascota },
        estadoservicio: { idestadoservicio: 2 }
      };
  
      this.consultaService.reservarConsulta(consultaToSend).subscribe(
        x => {
          console.log("Reserva realizada con exito");
          this.dialogRef.close();
        }
      );
    } else {
      console.log("Consulta or its properties are undefined");
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
