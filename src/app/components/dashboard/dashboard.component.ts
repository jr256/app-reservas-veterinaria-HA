import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private route: ActivatedRoute, private router: Router){

  }

  onNavigateToHomePage(): void{
    this.router.navigate(['home'], {relativeTo: this.route});
  }

  onNavigateToConsultaPage(): void{
    this.router.navigate(['consulta'], {relativeTo: this.route});
  }

  onNavigateToRecojoPage(): void{
    this.router.navigate(['recojo'], {relativeTo: this.route});
  }

  onNavigateToMisConsultasPage(): void{
    this.router.navigate(['consulta'], {relativeTo: this.route});
  }

  onNavigateToMisRecojosPage(): void{
    this.router.navigate(['reserva'], {relativeTo: this.route});
  }


}
