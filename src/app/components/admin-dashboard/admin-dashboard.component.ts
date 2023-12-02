import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){

  }

  onNavigateToMascotasPage(): void{
    this.router.navigate(['mascotas'], {relativeTo: this.route});
  }

  onLogout() {
    this.authService.logout();
  }

}
