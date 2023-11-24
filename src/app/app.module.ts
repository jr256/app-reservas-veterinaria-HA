import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material/material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConsultaReservaComponent } from './dashboard/consulta/consulta-reserva/consulta-reserva.component';
import { RecojoReservaComponent } from './dashboard/recojo/recojo-reserva/recojo-reserva.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    ConsultaReservaComponent,
    RecojoReservaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      
      { path: 'dashboard', component: DashboardComponent, 
      children:[
        { path: 'home', component: HomeComponent },
        { path: 'consulta', component: ConsultaReservaComponent },
        { path: 'recojo', component: RecojoReservaComponent },
      ]
    
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    
   
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
