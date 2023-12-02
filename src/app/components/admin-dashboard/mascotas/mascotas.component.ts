import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, Observable, throwError } from "rxjs";
import { Mascota } from 'src/app/models/mascota.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { EmailExistsValidator } from 'src/app/validators/emailexists.validator';
import { PageResponse } from 'src/app/models/page.response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit{

  searchFormGroup!: FormGroup;
  mascotaFormGroup!: FormGroup;
  pageMascotas!: Observable<PageResponse<Mascota>>;
  errorMessage!: string;
  currentPage: number = 0;
  pageSize: number = 5;
  submitted: boolean = false;

  constructor(private dialog: MatDialog, private mascotaService: MascotaService, private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.mascotaFormGroup = this.fb.group({
      nombremascota: ["", Validators.required],
      nombrepropietario: ["", Validators.required],
      user: this.fb.group({
        email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], [EmailExistsValidator.validate(this.userService)]],
        password: ["", Validators.required],
      })
    })

    this.handleSearchMascotas();
  }

  handlePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleSearchMascotas();
  }

  getModal(content: any) {
    const dialogRef = this.dialog.open(content, {width: '80%'});
    this.submitted = false
  }

  handleSearchMascotas() {
    let keyword = this.searchFormGroup.value.keyword;
    this.pageMascotas = this.mascotaService.searchMascotas(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }
  
  onSaveMascota() {
    this.submitted = true;
    if (this.mascotaFormGroup.invalid) return;
    this.mascotaService.saveMascota(this.mascotaFormGroup.value).subscribe({
      next: () => {
        alert("Mascota guardada con éxito");
        this.handleSearchMascotas();
        this.mascotaFormGroup.reset();
        this.submitted = false;
        this.dialog.closeAll();
      }, error: err => {
        alert(err.message)
      }
    })
  }

  onCloseModal() {
    this.dialog.closeAll();
    this.mascotaFormGroup.reset();
  }


}
