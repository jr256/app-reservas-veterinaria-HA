import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, Observable, throwError } from "rxjs";
import { Mascota } from 'src/app/models/mascota.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { UsersService } from 'src/app/services/users.service';

import { EmailExistsValidator } from 'src/app/validators/emailexists.validator';
import { PageResponse } from 'src/app/models/page.response.model';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit{
  formularioMascota!: FormGroup;
  

  constructor(private formBuilder: FormBuilder, 
    private mascotaService: MascotaService, 
    private fb: FormBuilder, 
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formularioMascota = this.formBuilder.group({
      idmascota: [{value: '', disabled: true}],
      nombremascota: ['', Validators.required],
      nombrepropietario: ['', Validators.required],
      user: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    });
  }

  onSaveMascota(): void {
    if (this.formularioMascota.valid) {
      this.mascotaService.saveMascota(this.formularioMascota.value).subscribe({
        next: response => {
          this.formularioMascota.reset();

          this.snackBar.open('Mascota registrada con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin-dashboard/mascotas']);});
          console.log(response);
        },
        error: error => {
         
          console.error('Hubo un error al guardar la mascota', error);
        }
      });
    }
  }




}
