import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/angular-material/material/material.module';
import { LoginComponent } from './components//auth/login/login.component';
import { DashboardComponent } from './components//dashboard/dashboard.component';
import { HomeComponent } from './components//dashboard/home/home.component';
import { PageNotFoundComponent } from './components//page-not-found/page-not-found.component';
import { ConsultaReservaComponent } from './components//dashboard/consulta/consulta-reserva/consulta-reserva.component';
import { ConsultaDisponiblesComponent } from './components//dashboard/consulta/consulta-disponibles/consulta-disponibles.component';
import { RecojoReservaComponent } from './components//dashboard/recojo/recojo-reserva/recojo-reserva.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    RecojoReservaComponent,
    ConsultaDisponiblesComponent,
    ConsultaReservaComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },      
      { path: 'dashboard', component: DashboardComponent, 
      children:[
        { path: 'home', component: HomeComponent },
        { path: 'consulta', component: ConsultaDisponiblesComponent },
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
